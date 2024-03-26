package org.example.simple_jwt_solution.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.simple_jwt_solution.entities.ReservationStatus;
import org.example.simple_jwt_solution.entities.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Data
public class ReservationDto {

    private Integer id;

    private String tableType;

    private String description;

    private Date dateTime;

    private ReservationStatus reservationStatus;

    private Integer customerId;


}
