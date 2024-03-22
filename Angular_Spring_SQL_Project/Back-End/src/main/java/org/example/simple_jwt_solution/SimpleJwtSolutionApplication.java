package org.example.simple_jwt_solution;

import org.example.simple_jwt_solution.entities.Role;
import org.example.simple_jwt_solution.entities.User;
import org.example.simple_jwt_solution.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class SimpleJwtSolutionApplication implements CommandLineRunner {

    private final UserRepository userRepository;

    public SimpleJwtSolutionApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(SimpleJwtSolutionApplication.class, args);
    }

    public void run(String... args) {

        User adminAccount = userRepository.findByRole(Role.USER);

        if (null == adminAccount) {

            User user = new User();

            user.setEmail("user@test.com");
            user.setFirstname("user");
            user.setLastname("user");
            user.setRole(Role.USER);
            user.setPassword(new BCryptPasswordEncoder().encode("user"));
            userRepository.save(user);

        }

    }

}
