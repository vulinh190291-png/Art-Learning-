package org.hyjava.hyall.user.service;

import org.hyjava.hyall.user.pojo.User;
import org.hyjava.hyall.user.pojo.dto.UserDTO;
import org.hyjava.hyall.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public User addUser(UserDTO user) {
        User nUser = new User();
        BeanUtils.copyProperties(user, nUser);
        return userRepository.save(nUser);
    }

    @Override
    public void deleteUser(Integer UserId) {
        userRepository.deleteById(UserId);
    }

    @Override
    public User updateUser(UserDTO User) {
        Integer UserId = User.getUserId();
        User nuser = userRepository.findById(UserId).orElseThrow(() -> new RuntimeException("要更新的艺术类别不存在，ID: " + UserId));
        BeanUtils.copyProperties(User, nuser);
        return userRepository.save(nuser);
    }

    @Override
    public User queryUser(Integer userId) {
        return userRepository.findById(userId).get();
    }
}
