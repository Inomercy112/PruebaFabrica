package com.prueba.demo.Usuario.Servicio;

import com.prueba.demo.Usuario.DTO.UsuarioDTO;

import java.util.Optional;

public interface ServicioUsuarioMinimal {
     Optional<UsuarioDTO> buscarPorCorreo(String correo);
}
