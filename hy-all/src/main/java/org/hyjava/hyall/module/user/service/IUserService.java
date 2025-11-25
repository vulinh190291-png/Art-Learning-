package org.hyjava.hyall.module.user.service;

import org.hyjava.hyall.module.user.pojo.User;
import org.hyjava.hyall.module.user.pojo.dto.UserDTO;

public interface IUserService {
    public User addUser(UserDTO user);
    public void deleteUser(Integer UserId);
    public User updateUser(UserDTO User);
    public User queryUser(Integer userId);
    public Iterable<User> queryAllUser(Iterable<Integer> userIdList);
}
