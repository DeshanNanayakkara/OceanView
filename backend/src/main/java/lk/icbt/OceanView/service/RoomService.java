package lk.icbt.OceanView.service;

import lk.icbt.OceanView.model.Room;
import java.util.List;

public interface RoomService {

    Room createRoom(Room room);
    List<Room> getAllRooms();
    Room getRoomById(String roomId);
    Room updateRoom(String roomId, Room room);
    void deleteRoom(String roomId);

}
