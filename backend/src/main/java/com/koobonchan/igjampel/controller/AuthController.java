package com.koobonchan.igjampel.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

  @GetMapping("user")
  public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User user){
    Map<String, Object> userInfo = new HashMap<>();
    if(user != null) {
      userInfo.put("name", user.getAttribute("name"));
      userInfo.put("email", user.getAttribute("email"));
      userInfo.put("id", user.getAttribute("sub"));
    }
    else{
      userInfo.put("error", "User not authenticated");
    }
    return userInfo;
  }

}
