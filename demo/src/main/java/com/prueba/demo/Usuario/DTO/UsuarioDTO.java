package com.prueba.demo.Usuario.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private int idDto ;
    private String nombreDto;
    private String apellidoDto;
    private String correoDto;
    private String contrasenaDto;
    private String fechaNacimientoDto;
    private int documentoDto;
    private String direccionDto;
    private String profesionDto;
    private String especialidadDto;
    private int estadoDto;
    private RolDto rolDto;
    private String token;

    @Data
    public static class RolDto{
        private int idDto;
        private String nombreRol;
    }
}
