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

        User adminAccount = userRepository.findByRole(Role.ADMIN);

        if (null == adminAccount) {

            User user = new User();

            user.setEmail("test@test.com");
            user.setFirstname("admin");
            user.setLastname("admin");
            user.setRole(Role.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);

        }

    }

}
