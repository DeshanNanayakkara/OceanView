package lk.ijse.gdse68.hotelbookingsystem.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse> bookings;
    private List<String> amenities;

    public RoomResponse(String id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }
    
    public RoomResponse(String id, String roomType, BigDecimal roomPrice, List<String> amenities) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.amenities = amenities;
    }
}
