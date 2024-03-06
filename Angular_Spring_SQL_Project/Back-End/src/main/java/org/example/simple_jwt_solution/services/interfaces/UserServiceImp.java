package org.example.simple_jwt_solution.services.interfaces;


import lombok.RequiredArgsConstructor;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.repository.UserRepository;
import org.example.simple_jwt_solution.services.imp.UserService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return username ->
                userRepository
                        .findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException(username + " Does not exist"));
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

}
