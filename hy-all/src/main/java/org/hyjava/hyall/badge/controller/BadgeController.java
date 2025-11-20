package org.hyjava.hyall.badge.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.badge.pojo.Badge;
import org.hyjava.hyall.badge.pojo.dto.BadgeDTO;
import org.hyjava.hyall.badge.service.IBadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/badge")
public class BadgeController {
    @Autowired
    IBadgeService badgeService;
    @PostMapping
    public ResponseMessage<Badge> addBadge(@RequestBody @Validated BadgeDTO badge) {
        Badge nbadge = badgeService.addBadge(badge);
        return ResponseMessage.success(nbadge);
    }

    @DeleteMapping
    public void deleteBadge(@RequestBody Integer badgeId) { badgeService.deleteBadge(badgeId);}

    @PutMapping
    public ResponseMessage<Badge> updateBadge(@RequestBody @Validated BadgeDTO badge) {
        Badge nbadge = badgeService.updateBadge(badge);
        return ResponseMessage.success(nbadge);
    }

    @GetMapping
    public ResponseMessage<Badge> queryBadge(@RequestParam Integer badgeId) {
        Badge nbadge = badgeService.queryBadge(badgeId);
        return ResponseMessage.success(nbadge);}
}