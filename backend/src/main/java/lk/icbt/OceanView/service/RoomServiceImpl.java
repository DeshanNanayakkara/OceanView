package lk.icbt.OceanView.service;

import lk.icbt.OceanView.model.Room;
import lk.icbt.OceanView.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(String roomId) {
        return roomRepository.findById(roomId).orElse(null);
    }

    @Override
    public Room updateRoom(String roomId, Room room) {
        Room existingRoom = getRoomById(roomId);
        if (existingRoom != null) {
            room.setRoomId(roomId);
            return roomRepository.save(room);
        }
        return null;
    }

    @Override
    public void deleteRoom(String roomId) {
        roomRepository.deleteById(roomId);
    }

}
