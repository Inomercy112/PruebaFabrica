package com.prueba.demo.ActividadUsuario.DTO;

import com.prueba.demo.ActividadEtapa.ActividadEtapa;
import com.prueba.demo.ActividadEtapa.ActividadEtapaDTO;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActividadUsuarioDTO {
    private int idDto;
    private EtapaProyectoDTO idDesarrolladorDto;
    private List <ActividadEtapaDTO> idActividadEtapaDto;
    private String ejecucionDto;
}
