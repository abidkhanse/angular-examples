package org.example.simple_jwt_solution.dto;

import org.example.simple_jwt_solution.entities.User;
import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class JwtAuthResponse {

    private String token;

    private String role;

    private HttpStatus Status;

    private String message;

    private int userId;

}
