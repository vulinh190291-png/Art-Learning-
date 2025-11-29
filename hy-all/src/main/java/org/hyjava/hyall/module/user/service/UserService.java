package org.hyjava.hyall.module.user.service;

import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.module.user.pojo.User;
import org.hyjava.hyall.module.user.pojo.dto.UserDTO;
import org.hyjava.hyall.module.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hyjava.hyall.common.utils.JwtUtils;
import org.hyjava.hyall.common.exception.BizException;

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

    public String login(String username, String password) {
        // 1. 查用户
        User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 2. 校验密码 (注意：生产环境必须用 BCrypt 加密，不能明文比对！)
        if (!user.getPassword().equals(password)) {
            throw new BizException(ResultCodes.ERROR);
        }

        // 3. 生成 Token (这就是发证)
        return JwtUtils.createToken(user.getUserId());
    }
}
