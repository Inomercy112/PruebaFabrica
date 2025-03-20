package com.prueba.demo.EtapaProyecto.DTO;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtapaProyectoDTO {
    private int idDto;
    private int proyectoDto;
    private EtapaDTO etapaDto;
    private String fechaInicio;
    private String fechaFin;
    private List <ActividadDTO> actividadDto;
}
