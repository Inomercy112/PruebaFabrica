package com.prueba.demo.Actividad.Controlador;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Servicio.ServicioActividad;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actividad")
public class ControladorActividad {
    private final ServicioActividad servicioActividad;
    public ControladorActividad(ServicioActividad servicioActividad) {
        this.servicioActividad = servicioActividad;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarActividad(@RequestBody ActividadDTO actividadDTO) {
        try {
            servicioActividad.crearActividad(actividadDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarActividad() {
        try {
            List<ActividadDTO> actividadDTOList = servicioActividad.listarActividades();
            return ResponseEntity.ok().body(actividadDTOList);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/Actualizar/{id}") public ResponseEntity<?> actualizarActividad(@PathVariable int id, @RequestBody ActividadDTO actividadDTO) {
        try {
            actividadDTO.setIdDto(id);
            servicioActividad.crearActividad(actividadDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
