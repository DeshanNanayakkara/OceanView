package lk.ijse.gdse68.hotelbookingsystem.repository;

import lk.ijse.gdse68.hotelbookingsystem.model.BookedRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookedRoomRepository extends MongoRepository<BookedRoom, String> {

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findByRoomId(String id);

    List<BookedRoom> findByGuestEmail(String guestEmail);
    
    // We use this for finding booked rooms in a date range
    List<BookedRoom> findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
        java.time.LocalDate checkOutDate, java.time.LocalDate checkInDate);
}
