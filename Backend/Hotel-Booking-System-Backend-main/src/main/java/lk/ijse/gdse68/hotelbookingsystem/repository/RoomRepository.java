package lk.ijse.gdse68.hotelbookingsystem.repository;

import lk.ijse.gdse68.hotelbookingsystem.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {

    List<Room> findByIdNotInAndRoomTypeLikeIgnoreCase(List<String> bookedRoomIds, String roomType);
    
    // Find rooms without specifying room kind
    List<Room> findByIdNotIn(List<String> bookedRoomIds);

}
