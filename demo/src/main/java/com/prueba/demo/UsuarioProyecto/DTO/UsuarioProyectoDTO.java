package com.prueba.demo.UsuarioProyecto.DTO;

import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioProyectoDTO {
    private int idDto;
    private UsuarioDTO idUsuarioDto;
    private ProyectoDTO idProyectoDto;
}
