package com.prueba.demo.EtapaProyecto.DTO;

import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtapaProyectoDTO {
    private int idDto;
    private int proyectoDto;
    private int etapaDto;
    private String fechaInicio;
    private String fechaFin;
}
