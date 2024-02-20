package org.example.simple_jwt_solution.services;


import lombok.RequiredArgsConstructor;
import org.example.simple_jwt_solution.dto.JwtAuthResponse;
import org.example.simple_jwt_solution.dto.SignInRequest;
import org.example.simple_jwt_solution.dto.SignupRequest;
import org.example.simple_jwt_solution.entities.Role;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setFirstname(signupRequest.getFirstName());
        user.setLastname(signupRequest.getLastName());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        return userRepository.save(user);

    }

    public JwtAuthResponse signIn(SignInRequest signInRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));

        User user = userRepository
                .findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user name or password"));

        String token = jwtService.generateToken(user);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setToken(token);
        return jwtAuthResponse;
    }

}
