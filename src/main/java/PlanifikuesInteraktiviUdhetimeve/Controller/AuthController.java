package PlanifikuesInteraktiviUdhetimeve.Controller;

import PlanifikuesInteraktiviUdhetimeve.DTO.UserDTO;
import PlanifikuesInteraktiviUdhetimeve.Entity.Role;
import PlanifikuesInteraktiviUdhetimeve.Entity.User;
import PlanifikuesInteraktiviUdhetimeve.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        // Create default admin if it doesn't exist
        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            log.debug("Creating default admin user");
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Admin");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            log.info("Default admin user created successfully");
        } else {
            log.debug("Admin user already exists");
            // Update admin password if needed
            User admin = userRepository.findByEmail("admin@admin.com").get();
            admin.setPassword(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            log.info("Admin password updated successfully");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setRole(Role.USER); // Default role for new registrations
        userRepository.save(user);
        
        return ResponseEntity.ok().body("User registered successfully");
    }
}
