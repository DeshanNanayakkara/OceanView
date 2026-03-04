package lk.icbt.OceanView.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Room {
    @Id
    private String roomId;
    private String roomType;
    private double pricePerNight;
    private boolean isAvailable;
}
