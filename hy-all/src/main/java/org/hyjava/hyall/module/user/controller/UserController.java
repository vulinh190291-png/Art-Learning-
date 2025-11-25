package org.hyjava.hyall.module.user.controller;

import org.hyjava.hyall.module.address.pojo.ResponseMessage;
import org.hyjava.hyall.module.user.pojo.User;
import org.hyjava.hyall.module.user.pojo.dto.UserDTO;
import org.hyjava.hyall.module.user.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {
    @Autowired
    IUserService userService;
    @PostMapping
    public ResponseMessage<User> addUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.addUser(user);
        return ResponseMessage.success(nuser);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Integer userId) {
        userService.deleteUser(userId);
    }

    @PutMapping
    public ResponseMessage<User> updateUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.updateUser(user);
        return ResponseMessage.success(nuser);
    }

    @GetMapping
    public ResponseMessage<User> queryUser(@RequestParam Integer userId) {
        User nuser = userService.queryUser(userId);
        return ResponseMessage.success(nuser);
    }

    public ResponseMessage<List<User>> queryAllUser() {

    }
}
