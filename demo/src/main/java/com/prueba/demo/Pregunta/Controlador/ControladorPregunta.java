package com.prueba.demo.Pregunta.Controlador;

import com.prueba.demo.Pregunta.DTO.PreguntaDTO;
import com.prueba.demo.Pregunta.Servicio.ServicioPregunta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pregunta")
public class ControladorPregunta {
    private final ServicioPregunta servicioPregunta;
    public ControladorPregunta(ServicioPregunta servicioPregunta) {
        this.servicioPregunta = servicioPregunta;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarPregunta(@RequestBody PreguntaDTO preguntaDTO) {
        try {
            servicioPregunta.registrarPregunta(preguntaDTO);
            return ResponseEntity.ok("registrado correctamente");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarPregunta() {
        try{
            List<PreguntaDTO> preguntaDTOList = servicioPregunta.obtenerPreguntas();
            return ResponseEntity.ok(preguntaDTOList);

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
