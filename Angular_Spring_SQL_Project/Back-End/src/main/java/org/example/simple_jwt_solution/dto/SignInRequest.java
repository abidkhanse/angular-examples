package org.example.simple_jwt_solution.dto;

import lombok.Data;

@Data
public class SignInRequest {

    private String email;

    private String password;

}

