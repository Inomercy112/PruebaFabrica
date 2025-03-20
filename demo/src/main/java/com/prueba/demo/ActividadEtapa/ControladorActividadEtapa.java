package com.prueba.demo.ActividadEtapa;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actividadEtapa")
public class ControladorActividadEtapa {
    private final ServicioEtapaActividad servicioEtapaActividad;
    public ControladorActividadEtapa(ServicioEtapaActividad servicioEtapaActividad) {
        this.servicioEtapaActividad = servicioEtapaActividad;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarActividadEtapa(@RequestBody ActividadEtapaDTO actividadEtapaDTO) {
        try {
            servicioEtapaActividad.crearActividadEtapa(actividadEtapaDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<?> consultarActividadEtapa(@PathVariable int id) {
        try {
            List<ActividadEtapaDTO> actividadEtapaDTOList = servicioEtapaActividad.listarActividadEtapa(id);
            return ResponseEntity.ok().body(actividadEtapaDTOList);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
