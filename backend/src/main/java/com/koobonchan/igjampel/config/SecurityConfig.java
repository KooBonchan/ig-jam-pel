package com.koobonchan.igjampel.config;

import com.koobonchan.igjampel.security.JwtAuthenticationFilter;
import com.koobonchan.igjampel.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/api/**").authenticated()
        .anyRequest().permitAll())
      .oauth2Login(oauth2 -> oauth2
        .userInfoEndpoint(userInfo -> userInfo
          .oidcUserService(new OidcUserService()))
        .successHandler((request, response, authentication) -> {
          OidcUser user = (OidcUser) authentication.getPrincipal();
          String token = jwtTokenProvider.generateToken(user);
          response.sendRedirect("http://localhost:3000?token=" + token);
        })
      )
      .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
    ;

    return http.build();
  }

  @Bean
  public OAuth2UserService oidcUserService(){
    return new OidcUserService();
  }

}
