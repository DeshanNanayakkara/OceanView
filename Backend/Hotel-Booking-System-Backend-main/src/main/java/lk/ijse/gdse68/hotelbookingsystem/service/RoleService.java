package lk.ijse.gdse68.hotelbookingsystem.service;

import lk.ijse.gdse68.hotelbookingsystem.model.Roles;
import lk.ijse.gdse68.hotelbookingsystem.model.User;

import java.util.List;

public interface RoleService {
    List<Roles> getRoles();
    Roles createRole(Roles role);
    void deleteRole(Long id);
    Roles findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRolesToUser(Long userId, Long roleId);
    Roles removeAllUsersFromRoles(Long roleId);
}
