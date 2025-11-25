package org.hyjava.hyall.module.address.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.address.pojo.Address;
import org.hyjava.hyall.module.address.pojo.dto.AddressDTO;
import org.hyjava.hyall.module.address.service.IAddrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class AddrController {
    @Autowired
    IAddrService addrservice;

    @PostMapping
    public Result<Address> addUserAddress(@RequestBody @Validated AddressDTO address) {
        Address naddress = addrservice.addUserAddress(address);
        return Result.success(naddress);
    }

    @DeleteMapping
    public void deleteUserAddress(@RequestBody Integer addressId) {
        addrservice.deleteUserAddress(addressId);
    }

    @PutMapping
    public Result<Address> updateUserAddress(@RequestBody @Validated AddressDTO address) {
        Address naddress = addrservice.updateUserAddress(address);
        return Result.success(naddress);
    }

    @GetMapping
    public Result<Address> queryUserAddress(@RequestBody Integer addressId) {
        Address naddress = addrservice.queryUserAddress(addressId);
        return Result.success(naddress);
    }
}
