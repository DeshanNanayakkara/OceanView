package lk.ijse.gdse68.hotelbookingsystem.service;

import lk.ijse.gdse68.hotelbookingsystem.model.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    List<User> getAllUsers();
    void deleteUser(String email);
    User getUserByEmail(String email);
}
