package com.prueba.demo.Configuracion.Seguridad;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwUtil {
    private final SecretKey key = Jwts.SIG.HS256.key().build();
    public String generarToken(String correo, int id, String rol){
        return Jwts.builder()
                .subject(correo)
                .claim("userId", id)
                .claim("userRol", rol)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 *60 *3 ))
                .signWith(key)
                .compact();

    }
    public Boolean validarToken(String token, String correo) {
        final String correoExtraido = extraerCorreo(token);
        return (correoExtraido.equals(correo) && !estaExpirado(token));
    }

    public String extraerCorreo(String token) {
        return extraerClaim(token, Claims::getSubject);
    }

    private boolean estaExpirado(String token) {
        return extraerClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extraerClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }
}
