package org.example.simple_jwt_solution.controller;

import lombok.RequiredArgsConstructor;
import org.example.simple_jwt_solution.dto.JwtAuthResponse;
import org.example.simple_jwt_solution.dto.SignInRequest;
import org.example.simple_jwt_solution.dto.SignupRequest;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.services.AuthenticationService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {

        User user = authenticationService.signup(signupRequest);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists.");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest signInRequest) {

        JwtAuthResponse jwtAuthResponse = authenticationService.signIn(signInRequest);

        if (jwtAuthResponse.getStatus() != HttpStatus.OK) {
            return ResponseEntity.status(jwtAuthResponse.getStatus())
                    .body(jwtAuthResponse.getMessage());
        }

        return ResponseEntity.ok(jwtAuthResponse);

    }

}
