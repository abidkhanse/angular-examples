package org.example.simple_jwt_solution.repository;

import org.example.simple_jwt_solution.dto.ReservationDto;
import org.example.simple_jwt_solution.entities.Category;
import org.example.simple_jwt_solution.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findAllByUserId(Integer customerId);
}
