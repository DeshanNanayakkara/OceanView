package lk.ijse.gdse68.hotelbookingsystem.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestFullName;
    private String guestEmail;
    private int numOfAdults;
    private int numOfChildren;
    private int totalNumOfGuests;
    private String bookingConfirmationCode;
    private RoomResponse roomResponse;

    public BookingResponse(Long bookingId, LocalDate checkOutDate, LocalDate checkInDate, String bookingConfirmationCode) {
        this.id = bookingId;
        this.checkOutDate = checkOutDate;
        this.checkInDate = checkInDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
