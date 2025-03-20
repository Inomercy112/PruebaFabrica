package com.prueba.demo.Proyecto.DTO;

import com.prueba.demo.Proyecto.Modelo.EstadoProyecto;
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
    private EstadoProyectoDto estadoProyectoDto;
    private String diaInicioDto;
    private String diaFinDto;
    private TipoProyectoDto tipoProyectoDto;


    @Data
    public static class EstadoProyectoDto {
        private int idDto;
        private String nombreEstadoDto;
    }
    @Data
    public static class TipoProyectoDto {
        private int idDto;
        private String nombreTipoProyectoDto;
    }
}
