package com.prueba.demo.Error.Controlador;

import com.prueba.demo.Error.DTO.ErrorDTO;
import com.prueba.demo.Error.Servicio.ServicioError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/error")
public class ControladorError {
    private final ServicioError servicioError;

    public ControladorError(ServicioError servicioError) {
        this.servicioError = servicioError;
    }

    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarError(@RequestBody ErrorDTO errorDTO) {
        try {
            servicioError.guardarError(errorDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar/TipoError")
    public ResponseEntity<?> traerTipoError() {
        try {
            List<ErrorDTO.TipoErrorDTO> tipoErrorDTOList = servicioError.obtenerTIposErrores();
            return ResponseEntity.ok().body(tipoErrorDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
