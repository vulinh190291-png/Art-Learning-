package org.hyjava.hyall.module.shopcartitem.controller;

import org.hyjava.hyall.module.shopcartitem.pojo.ResponseMessage;
import org.hyjava.hyall.module.shopcartitem.pojo.Sci;
import org.hyjava.hyall.module.shopcartitem.pojo.dto.SciDTO;
import org.hyjava.hyall.module.shopcartitem.service.ISciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sci")
public class SciController {
    @Autowired
    ISciService sciService;
    @PostMapping
    public ResponseMessage<Sci> addSci(@RequestBody @Validated SciDTO sci) {
        Sci nsci = sciService.addSci(sci);
        return ResponseMessage.success(nsci);
    }

    @DeleteMapping
    public void deleteSci(@RequestBody Integer cartItemId) {
        sciService.deleteSci(cartItemId);
    }

    @PutMapping
    public ResponseMessage<Sci> updateSci(@RequestBody @Validated SciDTO sci) {
        Sci nsci = sciService.updateSci(sci);
        return ResponseMessage.success(nsci);
    }

    @GetMapping
    public ResponseMessage<Sci> querySci(@RequestBody Integer cartItemId) {
        Sci nsci = sciService.querySci(cartItemId);
        return ResponseMessage.success(nsci);
    }
}