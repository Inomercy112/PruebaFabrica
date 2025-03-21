package com.prueba.demo.Actividad.DTO;

import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
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
    private EtapaProyectoDTO etapaProyectoDTO;
}
