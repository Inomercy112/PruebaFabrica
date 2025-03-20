package com.prueba.demo.ActividadUsuario.Controlador;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Servicio.ActividadUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<?> consultarActividadUsuario(@PathVariable int id) {
        try{
            List<ActividadUsuarioDTO> actividadUsuarioDTOList = actividadUsuarioService.traerActivdadesUsuario(id);
            return ResponseEntity.ok().body(actividadUsuarioDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
