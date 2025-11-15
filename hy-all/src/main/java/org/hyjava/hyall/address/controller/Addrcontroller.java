package org.hyjava.hyall.address.controller;

import org.hyjava.hyall.address.pojo.Address;
import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.address.pojo.dto.AddressDTO;
import org.hyjava.hyall.address.service.IAddrservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class Addrcontroller {
    @Autowired
    IAddrservice addrservice;

    @PostMapping
    public ResponseMessage<Address> addUserAddress(@RequestBody @Validated AddressDTO address) {
        Address naddress = addrservice.addUserAddress(address);
        return ResponseMessage.success(naddress);
    }

    @DeleteMapping
    public void deleteUserAddress(@RequestBody Integer addressId) {
        addrservice.deleteUserAddress(addressId);
    }

    @PutMapping
    public ResponseMessage<Address> updateUserAddress(@RequestBody @Validated AddressDTO address) {
        Address naddress = addrservice.updateUserAddress(address);
        return ResponseMessage.success(naddress);
    }

    @GetMapping
    public ResponseMessage<Address> queryUserAddress(@RequestBody Integer addressId) {
        Address naddress = addrservice.queryUserAddress(addressId);
        return ResponseMessage.success(naddress);
    }
}
