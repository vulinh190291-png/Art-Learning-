package org.hyjava.hyall.user.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.user.pojo.User;
import org.hyjava.hyall.user.pojo.dto.UserDTO;
import org.hyjava.hyall.user.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    IUserService userService;
    @PostMapping
    public ResponseMessage<User> addUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.addUser(user);
        return ResponseMessage.success(nuser);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody Integer userId) {
        userService.deleteUser(userId);
    }

    @PutMapping
    public ResponseMessage<User> updateUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.updateUser(user);
        return ResponseMessage.success(nuser);
    }

    @GetMapping
    public ResponseMessage<User> queryUser(@RequestBody Integer userId) {
        User nuser = userService.queryUser(userId);
        return ResponseMessage.success(nuser);
    }
}
