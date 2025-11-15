package org.hyjava.hyall.address.controller;

import org.hyjava.hyall.address.service.IAddrservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
public class Addrcontroller {
    @Autowired
    IAddrservice addrservice;

    @RequestMapping("/add")

}
