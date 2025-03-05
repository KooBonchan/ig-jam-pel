package com.koobonchan.igjampel.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenProvider {

  private final SecretKey SECRET_KEY;
  private final long EXPIRATION_TIME;
  // 1DAY
  public JwtTokenProvider(
    @Value("${jwt.secret}") String STRING_SECRET_KEY,
    @Value("${jwt.expiration-time-sec}") long EXPIRATION_TIME
  ){
    this.SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));
    this.EXPIRATION_TIME = EXPIRATION_TIME;
  }

  public String generateToken(OAuth2AuthenticationToken authToken) {
    Instant now = Instant.now();
    Map<String, Object> attributes = authToken.getPrincipal().getAttributes();
    return Jwts.builder()
      .subject(authToken.getPrincipal().getAttribute("sub")) // Google user ID
      .claim("fullname", attributes.get("name"))            // Full name
      .claim("picture", attributes.get("picture"))          // Profile image URL
      .issuedAt(Date.from(now))
      .expiration(Date.from(now.plus(EXPIRATION_TIME, ChronoUnit.SECONDS)))
      .signWith(SECRET_KEY)
      .compact();
  }

  public Claims validateToken(String token) {
    try {
      return Jwts.parser()
        .verifyWith(SECRET_KEY)
        .build()
        .parseSignedClaims(token)
        .getPayload();
    } catch (ExpiredJwtException e) {
      throw new RuntimeException("JWT has expired", e);
    } catch (JwtException e) {
      throw new RuntimeException("Invalid JWT", e);
    }
  }

  public String getSubject(String token) {
    return validateToken(token).getSubject();
  }

  public String getFullname(String token){
    return validateToken(token).get("fullname", String.class);
  }
}