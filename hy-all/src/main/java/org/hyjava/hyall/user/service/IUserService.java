package org.hyjava.hyall.user.service;

import org.hyjava.hyall.user.pojo.User;
import org.hyjava.hyall.user.pojo.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {
    public User addUser(UserDTO user);
    public void deleteUser(Integer UserId);
    public User updateUser(UserDTO User);
    public User queryUser(Integer userId);
}
