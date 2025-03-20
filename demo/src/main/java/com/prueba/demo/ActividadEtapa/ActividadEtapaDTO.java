package com.prueba.demo.ActividadEtapa;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActividadEtapaDTO {

        private int idDto;

        private EtapaProyectoDTO idDesarrolladorDto;

        private ActividadDTO idActividadDto;


}
