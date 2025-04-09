package PlanifikuesInteraktiviUdhetimeve.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /*
     * TODO: JWT Token Operations (Temporarily Disabled)
     * Original implementation included:
     * - Token generation with expiration
     * - Username and claims extraction
     * - Token validation
     * - Expiration checking
     */

    public String extractUsername(String token) {
        return "user@example.com"; // Default user for testing
    }

    public String generateToken(UserDetails userDetails) {
        return "dummy-token"; // Dummy token for testing
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        return true; // Always valid for testing
    }
}
