package PlanifikuesInteraktiviUdhetimeve.DTO;

public class AuthResponseDTO {

    private String token;
    private String email;
    private String role;

    private AuthResponseDTO(Builder builder) {
        this.token = builder.token;
        this.email = builder.email;
        this.role = builder.role;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    // Static Builder class
    public static class Builder {
        private String token;
        private String email;
        private String role;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public AuthResponseDTO build() {
            return new AuthResponseDTO(this);
        }
    }
}
