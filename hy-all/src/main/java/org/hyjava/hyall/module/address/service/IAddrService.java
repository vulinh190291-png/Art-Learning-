package org.hyjava.hyall.module.address.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.address.pojo.Address;
import org.hyjava.hyall.module.address.pojo.dto.AddressDTO;

public interface IAddrService {
    /*
      增加用户地址
      @param AddressDTO类型
     * @return  Address
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
