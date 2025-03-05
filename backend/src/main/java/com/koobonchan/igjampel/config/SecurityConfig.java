package com.koobonchan.igjampel.config;

import com.koobonchan.igjampel.security.JwtAuthenticationFilter;
import com.koobonchan.igjampel.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
        .authorizationEndpoint(endpoint -> endpoint
          .baseUri("/oauth2/authorization"))
        .redirectionEndpoint(endpoint -> endpoint
          .baseUri("/login/oauth2/code/*"))
        .successHandler(successHandler())
      )
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
      .csrf(AbstractHttpConfigurer::disable)


    ;

    return http.build();
  }

  private AuthenticationSuccessHandler successHandler(){
    return (request, response, authentication) -> {
      OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
      String jwt = jwtTokenProvider.generateToken(authToken);
      String redirectUrl = "http://localhost:3000/main?access_token=" + jwt;
      response.sendRedirect(redirectUrl);
    };
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:3000");
    configuration.addAllowedMethod("GET");
    configuration.addAllowedMethod("POST");
    configuration.addAllowedMethod("PUT");
    configuration.addAllowedMethod("DELETE");
    configuration.addAllowedHeader("Authorization");

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", configuration);

    return source;

  }

}
