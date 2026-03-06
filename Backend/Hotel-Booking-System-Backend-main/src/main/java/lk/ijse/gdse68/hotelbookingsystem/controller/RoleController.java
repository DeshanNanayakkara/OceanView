package lk.ijse.gdse68.hotelbookingsystem.controller;

import lk.ijse.gdse68.hotelbookingsystem.exception.RoleAlreadyExistException;
import lk.ijse.gdse68.hotelbookingsystem.model.Roles;
import lk.ijse.gdse68.hotelbookingsystem.model.User;
import lk.ijse.gdse68.hotelbookingsystem.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/role")
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/all")
    public ResponseEntity<List<Roles>> getAllRoles(){
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Roles theRole){
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New Role created successfully");
        }catch (RoleAlreadyExistException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-users-from-role/{id}")
    public Roles removeAllUsersFromRole(@PathVariable("id") Long id){
        return roleService.removeAllUsersFromRoles(id);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign-roles-to-user")
    public User assignRolesToUser(
            @RequestParam("userId") Long userId,
            @RequestParam("userId") Long roleId
    ){
        return roleService.assignRolesToUser(userId, roleId);
    }
}
