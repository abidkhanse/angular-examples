package org.example.simple_jwt_solution.services;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTServiceImp implements JWTService {

    @Value("${token.secret.key}")
    private String tokenSecretKey;

    @Value("${token.expiration.time.in.milliseconds}")
    private int twoHours;

    public String generateToken(UserDetails userDetails) {

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + twoHours))
                //.signWith(getSignKey(), SignatureAlgorithm.HS256)
                .signWith(Keys.secretKeyFor(SignatureAlgorithm.HS256))
                .compact();
    }

    private Key getSignKey() {
       byte[] keyBytes = Decoders.BASE64.decode(tokenSecretKey);
       return Keys.hmacShaKeyFor(keyBytes);
    }

/*
    @Override
    public String refreshToken(Map<String, Object> claims, UserDetails userDetails) {

        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 48 ))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
 */

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimResolver.apply(claims);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return userDetails.getUsername().equals(username) && !isTokenExpired(token) ;
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

}
