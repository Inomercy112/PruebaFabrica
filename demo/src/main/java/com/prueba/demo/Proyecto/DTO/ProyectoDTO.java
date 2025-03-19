package com.prueba.demo.Proyecto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProyectoDTO {
    private int idDto;
    private String nombreDto;
    private String descripcionDto;
    private int estadoDto;
}
