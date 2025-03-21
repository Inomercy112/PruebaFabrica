package com.prueba.demo.ActividadUsuario.Controlador;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.ActividadUsuario.Servicio.ActividadUsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/actividadUsuario")
public class ControladorActividadUsuario {
    private final ActividadUsuarioService actividadUsuarioService;
    private final ActividadUsuarioRepository actividadUsuarioRepository;

    public ControladorActividadUsuario(ActividadUsuarioService actividadUsuarioService, ActividadUsuarioRepository actividadUsuarioRepository) {
        this.actividadUsuarioService = actividadUsuarioService;
        this.actividadUsuarioRepository = actividadUsuarioRepository;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarActividadUsuario(@RequestBody ActividadUsuarioDTO actividadUsuarioDTO) {
        try {
            actividadUsuarioService.guardarActividadUsuario(actividadUsuarioDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<?> consultarActividadUsuario(@PathVariable int id) {
        try{
            List<ActividadUsuarioDTO> actividadUsuarioDTOList = actividadUsuarioService.traerActivdadesUsuario(id);
            return ResponseEntity.ok().body(actividadUsuarioDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<?> actualizarEjecucion(@PathVariable int id, @RequestBody ActividadUsuarioDTO actividadUsuarioDTO) {
        Optional<ActividadUsuario> actividadUsuarioOptional = actividadUsuarioRepository.findById(id);

        if (actividadUsuarioOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Actividad no encontrada");
        }

        ActividadUsuario actividadUsuario = actividadUsuarioOptional.get();
        actividadUsuario.setEjecucion(actividadUsuarioDTO.getEjecucionDto());

        actividadUsuarioRepository.save(actividadUsuario);
        return ResponseEntity.ok("Estado actualizado correctamente");
    }

    @GetMapping("/ConsultarP/{id}")
    public ResponseEntity<?> consultarActividadProyecto(@PathVariable int id) {
        try{
            List<ActividadUsuarioDTO> actividadUsuarioDTOList = actividadUsuarioService.traerActivdadesProyecto(id);
            return ResponseEntity.ok().body(actividadUsuarioDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
