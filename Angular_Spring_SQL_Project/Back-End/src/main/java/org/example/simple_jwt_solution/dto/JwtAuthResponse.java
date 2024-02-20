package org.example.simple_jwt_solution.dto;

import lombok.Data;

@Data
public class JwtAuthResponse {

    private String token;

    // may need later
    private String refreshToken;

}

