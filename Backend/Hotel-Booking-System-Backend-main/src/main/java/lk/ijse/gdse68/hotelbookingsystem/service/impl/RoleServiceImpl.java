package lk.ijse.gdse68.hotelbookingsystem.service.impl;

import lk.ijse.gdse68.hotelbookingsystem.exception.RoleAlreadyExistException;
import lk.ijse.gdse68.hotelbookingsystem.exception.UserAlreadyExistsException;
import lk.ijse.gdse68.hotelbookingsystem.model.Roles;
import lk.ijse.gdse68.hotelbookingsystem.model.User;
import lk.ijse.gdse68.hotelbookingsystem.repository.RoleRepository;
import lk.ijse.gdse68.hotelbookingsystem.repository.UserRepository;
import lk.ijse.gdse68.hotelbookingsystem.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Roles> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Roles createRole(Roles role) {
        String roleName = "ROLE_" + role.getName().toUpperCase();
        Roles roles = new Roles(roleName);
        if (roleRepository.existsByName(roleName)){
            throw new RoleAlreadyExistException(role.getName() + " already exists");
        }
        return roleRepository.save(roles);
    }

    @Override
    public void deleteRole(Long id) {
        this.removeAllUsersFromRoles(id);
        roleRepository.deleteById(id);
    }

    @Override
    public Roles findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Roles> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User assignRolesToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Roles> role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(user.get().getFirstName() + " is already assigned to " + role.get().getName());
        }

        if(role.isPresent()){
            role.get().assignRolesToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Roles removeAllUsersFromRoles(Long roleId) {
        Optional<Roles> roles = roleRepository.findById(roleId);
        roles.ifPresent(Roles::removeAllUsersFromRoles);
        return roleRepository.save(roles.get());
    }
}
