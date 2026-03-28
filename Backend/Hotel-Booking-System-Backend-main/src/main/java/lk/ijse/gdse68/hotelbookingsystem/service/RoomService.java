package lk.ijse.gdse68.hotelbookingsystem.service;

import lk.ijse.gdse68.hotelbookingsystem.model.Room;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface RoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, List<String> amenities) throws IOException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(String roomId);

    void deleteRoom(String id);

    Room updateRoom(String id, String roomType, BigDecimal roomPrice, byte[] photoByte, List<String> amenities);

    Optional<Room> getRoomById(String id);

    List<Room> getAvailableRooms(LocalDate checkInData, LocalDate checkOutData, String roomType);
}
