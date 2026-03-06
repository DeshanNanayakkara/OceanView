package lk.ijse.gdse68.hotelbookingsystem.service.impl;

import lk.ijse.gdse68.hotelbookingsystem.exception.InvalidBookingRequestException;
import lk.ijse.gdse68.hotelbookingsystem.exception.ResourceNotFoundException;
import lk.ijse.gdse68.hotelbookingsystem.model.BookedRoom;
import lk.ijse.gdse68.hotelbookingsystem.model.Room;
import lk.ijse.gdse68.hotelbookingsystem.repository.BookedRoomRepository;
import lk.ijse.gdse68.hotelbookingsystem.repository.RoomRepository;
import lk.ijse.gdse68.hotelbookingsystem.service.BookedRoomService;
import lk.ijse.gdse68.hotelbookingsystem.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookedRoomServiceImpl implements BookedRoomService {

    private final BookedRoomRepository bookedRoomRepository;
    private final RoomRepository roomRepository;
    private final RoomService roomService;

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookedRoomRepository.findByRoomId(id);
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookedRoomRepository.findAll();
    }

    @Override
    public BookedRoom findBookingByConfirmationCode(String confirmationCode) {
        return bookedRoomRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with confirmation code: " + confirmationCode));
    }

    @Override
    public String saveBooking(long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check out date should be after check in date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBooking = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBooking);
        if (roomIsAvailable){
            room.addBooking(bookingRequest);
            bookedRoomRepository.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Room is not available for the requested dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookedRoomRepository.deleteById(bookingId);
    }

    @Override
    public List<BookedRoom> getBookingsByEmail(String userEmail) {
        return bookedRoomRepository.findByGuestEmail(userEmail);
    }


    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                                bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
                );
    }

}
