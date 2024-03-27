package org.example.simple_jwt_solution.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.simple_jwt_solution.dto.ReservationDto;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
@Table(name="reservation")

public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tableType;

    private String description;

    private Date dateTime;

    private ReservationStatus reservationStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id" , nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public ReservationDto getReservationDto() {

        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setId(id);
        reservationDto.setTableType(tableType);
        reservationDto.setReservationStatus(reservationStatus);
        reservationDto.setDescription(description);
        reservationDto.setDateTime(dateTime);
        reservationDto.setCustomerId(user.getId());
        reservationDto.setCustomerName(user.getFirstname());

        return reservationDto;

    }
}
