package org.hyjava.hyall.module.user.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.user.pojo.User;
import org.hyjava.hyall.module.user.pojo.dto.UserDTO;
import java.util.List;

public interface IUserService {
    User addUser(UserDTO user);
    void deleteUser(Integer UserId);
    User updateUser(UserDTO User);
    User queryUser(Integer userId);
    List<User> queryAllUser(List<Integer> userIdList);
    String login(String username, String password);
}
