package com.prueba.demo.Reporte.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReporteProyectoDTO {
    private int idProyecto;
    private String nombreProyecto;
    private String descripcionProyecto;
    private String estadoProyecto;
    private int idEtapa;
    private String nombreEtapa;
    private int idActividad;
    private String nombreActividad;
    private String descripcionActividad;
    private String nombreEncargadoActividad;
    private int idUsuario;
    private String nombreUsuario;
    private String rolUsuario;
    private String descripcionError;
    private String nombreError;
    private String fechaInterrupcion;
    private String duracionInterrupcion;
    private String tipoInterrupcion;
}
