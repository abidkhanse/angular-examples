package org.example.simple_jwt_solution.dto;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class JwtAuthResponse {

    private String token;

    private String refreshToken;

    private HttpStatus Status;

    private String message;

}

