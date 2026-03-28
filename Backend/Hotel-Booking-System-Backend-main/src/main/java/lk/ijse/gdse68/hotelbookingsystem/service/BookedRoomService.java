package lk.ijse.gdse68.hotelbookingsystem.service;

import lk.ijse.gdse68.hotelbookingsystem.model.BookedRoom;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface BookedRoomService {
    List<BookedRoom> getAllBookingsByRoomId(String id);

    List<BookedRoom> getAllBookings();

    BookedRoom findBookingByConfirmationCode(String confirmationCode);

    String saveBooking(String roomId, BookedRoom bookingRequest);

    void cancelBooking(String bookingId);

    List<BookedRoom> getBookingsByEmail(String userEmail);
}
