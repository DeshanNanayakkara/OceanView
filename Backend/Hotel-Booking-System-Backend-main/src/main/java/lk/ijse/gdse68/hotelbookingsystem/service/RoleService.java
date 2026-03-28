package lk.ijse.gdse68.hotelbookingsystem.service;

import lk.ijse.gdse68.hotelbookingsystem.model.Roles;
import lk.ijse.gdse68.hotelbookingsystem.model.User;

import java.util.List;

public interface RoleService {
    List<Roles> getRoles();
    Roles createRole(Roles role);
    void deleteRole(String id);
    Roles findByName(String name);
    User removeUserFromRole(String userId, String roleId);
    User assignRolesToUser(String userId, String roleId);
    Roles removeAllUsersFromRoles(String roleId);
}
