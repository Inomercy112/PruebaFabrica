package com.prueba.demo.Usuario.Modelo;

import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {


    private final UsuarioDTO usuarioDTO;

    public CustomUserDetails(UsuarioDTO usuarioDTO) {
        this.usuarioDTO = usuarioDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(usuarioDTO.getRolDto().getNombreRol()));
    }

    @Override
    public String getPassword() {
        return usuarioDTO.getContrasenaDto();
    }

    @Override
    public String getUsername() {
        return usuarioDTO.getCorreoDto();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return usuarioDTO.getEstadoDto() == 1;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return usuarioDTO.getEstadoDto()== 1;
    }
}
