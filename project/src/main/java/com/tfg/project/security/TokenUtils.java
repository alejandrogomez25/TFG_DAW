package com.tfg.project.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.project.api.service.impl.UsuarioService;

@Component
public class TokenUtils {
	@Autowired
	private UsuarioService usuarioService;
	
    private static final Key key = Keys.hmacShaKeyFor("GKAGDFKAQWUEGFQWLOEFGBHASLDFBAOSUIDFHGAS".getBytes()); 
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; 

    public static String createToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        return Jwts.builder()
                .setSubject(email) 
                .setIssuer("principal")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }
    public static String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public static String extractUsername(String token) {
        return getUsernameFromToken(token);
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional(readOnly = true)
    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
    	System.out.println("getAuthentication");
        UserDetails userDetails = usuarioService.loadUserByUsername(extractUsername(token));
        System.out.println("getAuthentication");
        System.out.println(userDetails);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
