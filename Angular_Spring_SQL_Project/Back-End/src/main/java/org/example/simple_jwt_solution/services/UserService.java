package org.example.simple_jwt_solution.services;


import org.example.simple_jwt_solution.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService {
    UserDetailsService userDetailsService();
    User save(User newUser);

}
