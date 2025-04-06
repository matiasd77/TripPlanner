package PlanifikuesInteraktiviUdhetimeve.Service;

import PlanifikuesInteraktiviUdhetimeve.DTO.UserDTO;
import PlanifikuesInteraktiviUdhetimeve.Entity.User;
import PlanifikuesInteraktiviUdhetimeve.Mapper.UserMapper;
import PlanifikuesInteraktiviUdhetimeve.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepo;
    private UserRepository userRepository;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password must not be null or empty");
        }
        User user = UserMapper.toEntity(userDTO);
        return UserMapper.toDTO(userRepo.save(user));
    }
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update fields
        existingUser.setName(userDTO.getName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setRole(userDTO.getRole());
        existingUser.setPassword(userDTO.getPassword());  // Assuming password is allowed to be updated

        // Save updated user
        User updatedUser = userRepo.save(existingUser);

        return UserMapper.toDTO(updatedUser);
    }


    public UserDTO getUserById(Long id) {
        return userRepo.findById(id)
                .map(UserMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public List<UserDTO> getAllUsers() {
        return userRepo.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
