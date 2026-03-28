package lk.ijse.gdse68.hotelbookingsystem;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
public class HashTest {
    @Test
    public void test() { System.out.println("BDCRYPT_HASH: " + new BCryptPasswordEncoder().encode("admin123")); }
}
