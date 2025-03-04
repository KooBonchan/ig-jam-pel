package com.koobonchan.igjampel.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtTokenProvider {
  private final String STRING_SECRET_KEY = "d60a1456b3289b4dfc941493326337425aad1e6d7c2b3fd4f420b2a3772eb10436da221f907b95ed9fe287e3e0d190e41a096800aa2938743b987d557f584b4e0aab3899b21f2d67c8aabdee1854f45b4be9ffa8437ee945683d7c04dec44d27d3e7c6d09d8f39748d5ba345a1e0e0389b3109537199c1a52f404304eee0424ef2d9ccd5d5b5ef5a3ee051bf376d7df6abfbc50c9c8ea9fd6484f23bb38cb3f1bb2f7b33b49f24c0660fdcfff99407082837d4d8ec7db324ca5136cfd689fb5bee073a8e768b0657746e47f0946ee249c4c642f9cd4f9800decb6b45d99e36fc1549865ad961eb0c80f5e9fcd20d844df8febcbd260b37d7e52ba688b443a5356ed1f55834e93f4f13ec490c32d0e0983957a01e68264bc247e395eb55dd88ca7bbbf59f111729515a65a9015b3fed3874b01f9872ffd9ab02c5b4d8c62be9349fb22a869e28db6c60cfa5e7a6b74fec1d009be020271760cd8a36a3959c8d067391bb1a4693f77e216cf136baae6aa3850941acab5975145a25aceb4d624d33e796529396b1941247225bd9d17bd5f9d476a8a864bcf280f45963f30ee07555ad66d3b7c30a4afc6b5a3b0aa13a1d24997ccf518182622cb9feb4bea0c306bdf8e967272146888852dd9970c3e8aee15dee7d56036832c8687445bc5d5454b8d9d16ac672351b5ed3f61231d140e552a818e5abab356582a6a62bf6ed66d99d";
  private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));
  private final long EXPIRATION_TIME = 86400; // 1DAY

  public String generateToken(OidcUser user){
    Instant now = Instant.now();
    return Jwts.builder()
      .subject(user.getSubject())
      .claim("name", user.getFullName())
      .claim("email", user.getEmail())
      .issuedAt(Date.from(now))
      .expiration(Date.from(now.plus(EXPIRATION_TIME, ChronoUnit.SECONDS)))
      .signWith(SECRET_KEY)
      .compact();
  }

  public String getSubject(String token) {
    return Jwts.parser()
      .verifyWith(SECRET_KEY) // Modern verification
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .getSubject();
  }


  public boolean validateToken(String token) {
    try {
      Jwts.parser()
        .verifyWith(SECRET_KEY)
        .build()
        .parseSignedClaims(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}