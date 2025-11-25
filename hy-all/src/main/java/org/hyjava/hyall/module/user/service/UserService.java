package org.hyjava.hyall.module.user.service;

import org.hyjava.hyall.module.user.pojo.User;
import org.hyjava.hyall.module.user.pojo.dto.UserDTO;
import org.hyjava.hyall.module.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public User updateUser(UserDTO user) {
        Integer userId = user.getUserId();
        User nUser = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("要更新的艺术类型不存在，ID：" + userId));
        BeanUtils.copyProperties(user, nUser);
        return userRepository.save(nUser);
    }

    @Override
    public User queryUser(Integer userId) {
        return userRepository.findById(userId).orElseThrow(()-> new RuntimeException("要更新的艺术类型不存在，ID：" + userId));
    }

    @Override
    public Iterable<User> queryAllUser(Iterable<Integer> userIdList) {
        return userRepository.findAllById(userIdList);
    }
}
