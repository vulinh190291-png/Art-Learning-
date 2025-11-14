package org.hyjava.hyall.address.service;

import org.hyjava.hyall.address.pojo.Address;
import org.hyjava.hyall.address.pojo.dto.AddressDTO;
import org.springframework.stereotype.Service;

@Service
public interface IAddrservice {
    /*
      增加用户地址
      @param userId
     * @return
     */
    public Address addUserAddress(AddressDTO address);
    /*
      删除用户地址
      @param id
     * @return
     */
    public void deleteUserAddress(Integer addressId);
    /*
      修改用户地址
      @param id
     * @return
     */
    public Address updateUserAddress(AddressDTO address);
    /*
      查询用户地址
      @param userId
     * @return
     */
    public Address queryUserAddress(Integer addressId);
}
