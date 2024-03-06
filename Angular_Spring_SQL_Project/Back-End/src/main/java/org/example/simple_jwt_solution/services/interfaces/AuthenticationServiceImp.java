package org.example.simple_jwt_solution.services.interfaces;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.example.simple_jwt_solution.dto.JwtAuthResponse;
import org.example.simple_jwt_solution.dto.SignInRequest;
import org.example.simple_jwt_solution.dto.SignupRequest;
import org.example.simple_jwt_solution.entities.Role;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.repository.UserRepository;
import org.example.simple_jwt_solution.services.imp.AuthenticationService;
import org.example.simple_jwt_solution.services.imp.JWTService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public User signup(SignupRequest signupRequest) {

        boolean found = userRepository.findByEmail(signupRequest.getEmail()).isPresent();
        if (found) {
            return null;
        }

        User user = new User();

        user.setEmail(signupRequest.getEmail());
        user.setFirstname(signupRequest.getFirstName());
        user.setLastname(signupRequest.getLastName());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        return userRepository.save(user);

    }

    public JwtAuthResponse signIn(SignInRequest signInRequest) {

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();

        try {
            authenticationManager.authenticate(

                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getEmail(),
                            signInRequest.getPassword()));

        } catch (AuthenticationException ex) {

            jwtAuthResponse.setToken(null);
            jwtAuthResponse.setRole(null);
            jwtAuthResponse.setStatus(HttpStatus.UNAUTHORIZED);
            jwtAuthResponse.setMessage("Invalid email/password provided");

            return jwtAuthResponse;
        }

        Optional<User> userOptional = userRepository.findByEmail(signInRequest.getEmail());

        if (!userOptional.isPresent()) {

            jwtAuthResponse.setToken(null);
            jwtAuthResponse.setRole(null);
            jwtAuthResponse.setStatus(HttpStatus.LOCKED);
            jwtAuthResponse.setMessage("User might be locked");

            return jwtAuthResponse;

        }

        User user = userOptional.get();
        String token = jwtService.generateToken(user);

        jwtAuthResponse.setToken(token);
        jwtAuthResponse.setRole(user.getRole().name());
        jwtAuthResponse.setStatus(HttpStatus.OK);
        jwtAuthResponse.setMessage("Success");

        return jwtAuthResponse;
    }

}
