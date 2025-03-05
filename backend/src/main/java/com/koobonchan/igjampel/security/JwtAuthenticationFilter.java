package com.koobonchan.igjampel.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtTokenProvider jwtTokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String jwt = getTokenFromRequest(request);
    if(jwt != null){
      try{
        Claims claims = jwtTokenProvider.validateToken(jwt);
        DefaultOAuth2User user = new DefaultOAuth2User(
          Collections.emptyList(),
          Map.of(
            "sub", claims.getSubject(),
            "name", claims.get("fullname"),
            "picture", claims.get("picture")
          ),
          "sub"
        );
        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
          user, user.getAuthorities(), "google"
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
        return;
      }catch (RuntimeException e){
//        expired or invalid
      }
    }
    String silentAuthUrl = "/oauth2/authorization/google?prompt=none";
    response.sendRedirect(silentAuthUrl);
  }

  private String getTokenFromRequest(HttpServletRequest request){
    String bearerToken = request.getHeader("Authorization");
    if(bearerToken != null && bearerToken.startsWith("Bearer ")){
      return bearerToken.substring(7);
    }
    return null;
  }
}
