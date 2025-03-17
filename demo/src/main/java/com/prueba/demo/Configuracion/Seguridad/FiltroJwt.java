package com.prueba.demo.Configuracion.Seguridad;

import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Modelo.CustomUserDetails;
import com.prueba.demo.Usuario.Servicio.ServicioUsuarioMinimal;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class FiltroJwt extends OncePerRequestFilter {

    private final JwUtil jwUtil;

    private final ServicioUsuarioMinimal servicioUsuarioMinimal;
    public FiltroJwt(JwUtil jwUtil, @Lazy ServicioUsuarioMinimal servicioUsuarioMinimal) {
        this.jwUtil = jwUtil;
        this.servicioUsuarioMinimal = servicioUsuarioMinimal;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        final String authorizationHeader = request.getHeader("Authorization");

        String correo = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            try {
                 correo = jwUtil.extraerCorreo(jwtToken);
            } catch (Exception e) {
                throw new ServletException(e.getMessage());

            }
        }

        if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UsuarioDTO usuarioDTO = servicioUsuarioMinimal.buscarPorCorreo(correo).orElse(null);
            if (usuarioDTO != null && jwUtil.validarToken(jwtToken, correo)) {
                UserDetails userDetails = new CustomUserDetails(usuarioDTO);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        chain.doFilter(request, response);
    }
}
