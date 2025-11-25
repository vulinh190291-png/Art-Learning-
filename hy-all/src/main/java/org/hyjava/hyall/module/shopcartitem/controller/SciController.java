package org.hyjava.hyall.module.shopcartitem.controller;
import org.hyjava.hyall.common.core.result.Result;

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
    public Result<Sci> addSci(@RequestBody @Validated SciDTO sci) {
        Sci nsci = sciService.addSci(sci);
        return Result.success(nsci);
    }

    @DeleteMapping
    public void deleteSci(@RequestBody Integer cartItemId) {
        sciService.deleteSci(cartItemId);
    }

    @PutMapping
    public Result<Sci> updateSci(@RequestBody @Validated SciDTO sci) {
        Sci nsci = sciService.updateSci(sci);
        return Result.success(nsci);
    }

    @GetMapping
    public Result<Sci> querySci(@RequestBody Integer cartItemId) {
        Sci nsci = sciService.querySci(cartItemId);
        return Result.success(nsci);
    }
}