package com.prueba.demo.Actividad.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActividadDTO {
    private int idDto;
    private String nombreActividadDto;
    private String descripcionActividadDto;
    private int estadoActividadDto;
}
