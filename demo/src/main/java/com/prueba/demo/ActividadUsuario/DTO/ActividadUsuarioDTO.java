package com.prueba.demo.ActividadUsuario.DTO;


import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActividadUsuarioDTO {
    private int idDto;
    private UsuarioProyectoDTO idDesarrolladorDto;

    private List <ActividadDTO> idActividadEtapaDto;
    private String ejecucionDto;
}
