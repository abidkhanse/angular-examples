package org.example.simple_jwt_solution.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {

    // public String refreshToken(Map<String, Object> claims, UserDetails userDetails);

    public String generateToken(UserDetails userDetails);

    public String extractUserName(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

}
