package org.example.simple_jwt_solution.services;

import org.example.simple_jwt_solution.dto.JwtAuthResponse;
import org.example.simple_jwt_solution.dto.SignInRequest;
import org.example.simple_jwt_solution.dto.SignupRequest;
import org.example.simple_jwt_solution.entities.User;

public interface AuthenticationService {

    User signup(SignupRequest signupRequest);

    JwtAuthResponse signIn(SignInRequest signInRequest);

}
