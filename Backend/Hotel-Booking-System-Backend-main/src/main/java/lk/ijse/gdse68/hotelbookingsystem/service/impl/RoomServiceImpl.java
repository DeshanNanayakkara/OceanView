package lk.ijse.gdse68.hotelbookingsystem.service.impl;

import lk.ijse.gdse68.hotelbookingsystem.exception.InternalServerException;
import lk.ijse.gdse68.hotelbookingsystem.exception.ResourceNotFoundException;
import lk.ijse.gdse68.hotelbookingsystem.model.BookedRoom;
import lk.ijse.gdse68.hotelbookingsystem.model.Room;
import lk.ijse.gdse68.hotelbookingsystem.repository.BookedRoomRepository;
import lk.ijse.gdse68.hotelbookingsystem.repository.RoomRepository;
import lk.ijse.gdse68.hotelbookingsystem.repository.RoomTypeRepository;
import lk.ijse.gdse68.hotelbookingsystem.model.RoomType;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import lk.ijse.gdse68.hotelbookingsystem.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final BookedRoomRepository bookedRoomRepository;
    private final MongoTemplate mongoTemplate;
    private final RoomTypeRepository roomTypeRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void seedDefaultRoomTypes() {
        List<String> defaultTypes = Arrays.asList("Single", "Couple", "AC", "Non-AC", "Family");
        for (String type : defaultTypes) {
            if (!roomTypeRepository.existsByName(type)) {
                roomTypeRepository.save(new RoomType(type));
            }
        }
    }

    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, List<String> amenities) throws IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        room.setAmenities(amenities);
        if (!photo.isEmpty()){
            byte[] photoByte = photo.getBytes();
            String base64Photo = Base64.getEncoder().encodeToString(photoByte);
            room.setPhoto(base64Photo);
        }

        if (!roomTypeRepository.existsByName(roomType)) {
            roomTypeRepository.save(new RoomType(roomType));
        }

        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        List<String> dynamicTypes = mongoTemplate.findDistinct("roomType", Room.class, String.class);
        List<String> explicitTypes = roomTypeRepository.findAll().stream().map(RoomType::getName).collect(Collectors.toList());
        
        Set<String> combinedTypes = new HashSet<>(dynamicTypes);
        combinedTypes.addAll(explicitTypes);
        return combinedTypes.stream().toList();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(String roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isEmpty()){
            throw new ResourceNotFoundException("Room not found for id : " + roomId);
        }
        String base64Photo = room.get().getPhoto();
        if (base64Photo != null && !base64Photo.isEmpty()){
            return Base64.getDecoder().decode(base64Photo);
        }
        return null;
    }

    @Override
    public void deleteRoom(String id) {
       Optional<Room> room = roomRepository.findById(id);
       if (room.isPresent()){
           roomRepository.deleteById(id);
       }
    }

    @Override
    public Room updateRoom(String id, String roomType, BigDecimal roomPrice, byte[] photoByte, List<String> amenities) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for id : " + id));
        if (roomType != null){
            room.setRoomType(roomType);
        }
        if (roomPrice != null){
            room.setRoomPrice(roomPrice);
        }
        if (photoByte != null && photoByte.length > 0){
            String base64Photo = Base64.getEncoder().encodeToString(photoByte);
            room.setPhoto(base64Photo);
        }
        if (amenities != null) {
            room.setAmenities(amenities);
        }
        roomRepository.save(room);
        return room;
    }

    @Override
    public Optional<Room> getRoomById(String id) {
        return Optional.of(roomRepository.findById(id).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        // Find conflicting bookings: CheckIn <= requestCheckOut AND CheckOut >= requestCheckIn
        List<BookedRoom> conflictingBookings = bookedRoomRepository
            .findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(checkOutDate, checkInDate);
            
        List<String> bookedRoomIds = conflictingBookings.stream()
            .map(br -> br.getRoom().getId())
            .collect(Collectors.toList());
            
        if (bookedRoomIds.isEmpty()) {
            if (roomType != null && !roomType.isEmpty()) {
                // Return all if no constraints, wait Mongo needs an empty array for not-in just to be safe it works
                // But let's just use empty array and regex
                return roomRepository.findByIdNotInAndRoomTypeLikeIgnoreCase(bookedRoomIds, roomType);
            }
            return roomRepository.findByIdNotIn(bookedRoomIds);
        }
        
        if (roomType != null && !roomType.isEmpty() && !roomType.equals("all")) {
            return roomRepository.findByIdNotInAndRoomTypeLikeIgnoreCase(bookedRoomIds, roomType);
        } else {
            return roomRepository.findByIdNotIn(bookedRoomIds);
        }
    }
}
