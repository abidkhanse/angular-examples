package org.example.simple_jwt_solution.repository;


import org.example.simple_jwt_solution.entities.Role;
import org.example.simple_jwt_solution.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findByRole(Role role);
}
