package org.hyjava.hyall.module.badge.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.badge.pojo.Badge;
import org.hyjava.hyall.module.badge.pojo.dto.BadgeDTO;
import org.hyjava.hyall.module.badge.service.IBadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/badge")
public class BadgeController {
    @Autowired
    IBadgeService badgeService;
    @PostMapping
    public Result<Badge> addBadge(@RequestBody @Validated BadgeDTO badge) {
        Badge nbadge = badgeService.addBadge(badge);
        return Result.success(nbadge);
    }

    @DeleteMapping
    public void deleteBadge(@RequestBody Integer badgeId) { badgeService.deleteBadge(badgeId);}

    @PutMapping
    public Result<Badge> updateBadge(@RequestBody @Validated BadgeDTO badge) {
        Badge nbadge = badgeService.updateBadge(badge);
        return Result.success(nbadge);
    }

    @GetMapping
    public Result<Badge> queryBadge(@RequestParam Integer badgeId) {
        Badge nbadge = badgeService.queryBadge(badgeId);
        return Result.success(nbadge);}
}