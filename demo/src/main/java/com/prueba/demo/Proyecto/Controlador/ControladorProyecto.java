package com.prueba.demo.Proyecto.Controlador;

import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Servicio.ServicioProyecto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyecto")
public class ControladorProyecto {
    private final ServicioProyecto servicioProyecto;

    public ControladorProyecto(ServicioProyecto servicioProyecto) {
        this.servicioProyecto = servicioProyecto;
    }

    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarProyecto(@RequestBody ProyectoDTO proyectoDTO) {
        try {
            servicioProyecto.registrarProyecto(proyectoDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarProyecto() {
        try {
            List<ProyectoDTO> proyectoDTOList = servicioProyecto.listarProyectos();
            return ResponseEntity.ok().body(proyectoDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar/{id}")
    public ResponseEntity<?> consultarProyecto(@PathVariable int id) {
        try {
            ProyectoDTO proyectoDTOOptional = servicioProyecto.buscarProyectoPorId(id).orElse(null);
            return ResponseEntity.ok().body(proyectoDTOOptional);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<?> actualizarProyecto(@PathVariable Integer id, @RequestBody ProyectoDTO proyectoDTO) {
        try {
            proyectoDTO.setIdDto(id);
            servicioProyecto.registrarProyecto(proyectoDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar/TipoProyecto")
    public ResponseEntity<?> consultarTipoProyecto() {
        try {
            List<ProyectoDTO.TipoProyectoDto> proyectoDTOList = servicioProyecto.listarTipoProyectos();
            return ResponseEntity.ok().body(proyectoDTOList);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar/EstadoProyecto")
    public ResponseEntity<?> consultarEstadoProyecto() {
        try {
            List<ProyectoDTO.EstadoProyectoDto> proyectoDTOList = servicioProyecto.listarEstadoProyectos();
            return ResponseEntity.ok().body(proyectoDTOList);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
