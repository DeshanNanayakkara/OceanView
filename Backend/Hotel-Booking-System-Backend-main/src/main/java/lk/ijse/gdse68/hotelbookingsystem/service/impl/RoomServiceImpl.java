package lk.ijse.gdse68.hotelbookingsystem.service.impl;

import lk.ijse.gdse68.hotelbookingsystem.exception.InternalServerException;
import lk.ijse.gdse68.hotelbookingsystem.exception.ResourceNotFoundException;
import lk.ijse.gdse68.hotelbookingsystem.model.Room;
import lk.ijse.gdse68.hotelbookingsystem.repository.RoomRepository;
import lk.ijse.gdse68.hotelbookingsystem.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!photo.isEmpty()){
            byte[] photoByte = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoByte);
            room.setPhoto(photoBlob);
        }

        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isEmpty()){
            throw new ResourceNotFoundException("Room not found for id : " + roomId);
        }
        Blob blob = room.get().getPhoto();
        if (blob != null){
            return blob.getBytes(1, (int) blob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long id) {
       Optional<Room> room = roomRepository.findById(id);
       if (room.isPresent()){
           roomRepository.deleteById(id);
       }
    }

    @Override
    public Room updateRoom(Long id, String roomType, BigDecimal roomPrice, byte[] photoByte) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for id : " + id));
        if (roomType != null){
            room.setRoomType(roomType);
        }
        if (roomPrice != null){
            room.setRoomPrice(roomPrice);
        }
        if (photoByte != null && photoByte.length > 0){
            try{
                room.setPhoto(new SerialBlob(photoByte));
            }catch (SQLException e){
                throw new InternalServerException("Error occurred while updating photo for room id : " + id);
            }
        }
        roomRepository.save(room);
        return room;
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return Optional.of(roomRepository.findById(id).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInData, LocalDate checkOutData, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInData, checkOutData, roomType);
    }
}
