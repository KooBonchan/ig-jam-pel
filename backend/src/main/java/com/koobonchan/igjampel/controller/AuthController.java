package com.koobonchan.igjampel.controller;

import com.koobonchan.igjampel.security.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class AuthController {
  private final JwtTokenProvider jwtTokenProvider;

  @GetMapping("user")
  public Map<String, String> getUser(@RequestHeader("Authorization") String authHeader){
    String token = authHeader.replace("Bearer ", "");
    Claims claims = jwtTokenProvider.validateToken(token);

    return Map.of(
      "fullname", claims.get("fullname", String.class),
      "picture", claims.get("picture", String.class)
    );
  }

}
