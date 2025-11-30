package org.hyjava.hyall.module.user.controller;
import org.hyjava.hyall.common.core.result.Result;

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
    public Result<User> addUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.addUser(user);
        return Result.success(nuser);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Integer userId) {
        userService.deleteUser(userId);
    }

    @PutMapping
    public Result<User> updateUser(@RequestBody @Validated UserDTO user) {
        User nuser = userService.updateUser(user);
        return Result.success(nuser);
    }

    @GetMapping
    public Result<User> queryUser(@RequestParam Integer userId) {
        User nuser = userService.queryUser(userId);
        return Result.success(nuser);
    }

    @GetMapping("/getbatch")
    public Result<List<User>> queryAllUser(List<Integer> userIds) {
        List<User> nLUser = userService.queryAllUser(userIds);
        return Result.success(nLUser);
    }

    @PostMapping("/login")
    public Result<String> login(@RequestBody UserDTO userDTO) {
        // 只要用户名和密码
        String token = userService.login(userDTO.getUserName(), userDTO.getPassword());
        // 返回 Token 给前端
        return Result.success(token);
    }
}
