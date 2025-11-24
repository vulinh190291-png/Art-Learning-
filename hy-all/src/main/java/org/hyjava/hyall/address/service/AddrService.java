package org.hyjava.hyall.address.service;

import org.hyjava.hyall.address.pojo.Address;
import org.hyjava.hyall.address.pojo.dto.AddressDTO;
import org.hyjava.hyall.address.repository.AddRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddrService implements IAddrService {
    @Autowired
    AddRepository addrepository;

    @Override
    public Address addUserAddress(AddressDTO address) {
        Address naddress = new Address();
        BeanUtils.copyProperties(address, naddress);
        return addrepository.save(naddress);
    }

    @Override
    public void deleteUserAddress(Integer addressId) {
        addrepository.deleteById(addressId);
    }

    @Override
    public Address updateUserAddress(AddressDTO address) {
        Address naddress = new Address();
        BeanUtils.copyProperties(address, naddress);
        return addrepository.save(naddress);
    }

    @Override
    public Address queryUserAddress(Integer addressId) {
        return addrepository.findById(addressId).get();
    }
}
