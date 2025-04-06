package PlanifikuesInteraktiviUdhetimeve.Mapper;


import PlanifikuesInteraktiviUdhetimeve.DTO.UserDTO;
import PlanifikuesInteraktiviUdhetimeve.Entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole(),user.getPassword());
    }

    public static User toEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword());
        return user;
    }
}
