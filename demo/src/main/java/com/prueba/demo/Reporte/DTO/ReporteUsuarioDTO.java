package com.prueba.demo.Reporte.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReporteUsuarioDTO {
    private int idUsuario;
    private String nombreCompleto;
    private int idProyecto;
    private String nombreProyecto;
    private int idEtapa;
    private String nombreEtapa;
    private int idActividad;
    private String nombreActividad;
    private String descripcionActividad;
    private String errores;
    private String nombreError;
    private String fechaInterrupcion;
    private String duracionInterrupcion;
    private String tipoInterrupcion;
}
