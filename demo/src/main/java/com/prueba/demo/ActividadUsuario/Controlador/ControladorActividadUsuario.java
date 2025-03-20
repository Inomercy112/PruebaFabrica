package com.prueba.demo.ActividadUsuario.Controlador;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Servicio.ActividadUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/actividadUsuario")
public class ControladorActividadUsuario {
    private final ActividadUsuarioService actividadUsuarioService;
    public ControladorActividadUsuario(ActividadUsuarioService actividadUsuarioService) {
        this.actividadUsuarioService = actividadUsuarioService;
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
    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarActividadUsuario() {
        return ResponseEntity.ok().build();
    }
}
