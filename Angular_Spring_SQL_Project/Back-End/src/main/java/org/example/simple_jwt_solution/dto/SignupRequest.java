package org.example.simple_jwt_solution.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
