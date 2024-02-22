package org.example.simple_jwt_solution.controller;

import lombok.RequiredArgsConstructor;
import org.example.simple_jwt_solution.dto.JwtAuthResponse;
import org.example.simple_jwt_solution.dto.SignInRequest;
import org.example.simple_jwt_solution.dto.SignupRequest;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(authenticationService.signup(signupRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signin(@RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

}
