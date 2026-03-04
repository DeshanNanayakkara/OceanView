package lk.icbt.OceanView.repository;

import lk.icbt.OceanView.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoomRepository extends MongoRepository<Room, String> {

    
}
