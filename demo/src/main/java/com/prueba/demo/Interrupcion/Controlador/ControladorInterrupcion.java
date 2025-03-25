package com.prueba.demo.Interrupcion.Controlador;

import com.prueba.demo.Interrupcion.DTO.InterrupcionDTO;
import com.prueba.demo.Interrupcion.Servicio.ServicioInterrupcion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interrupcion")
public class ControladorInterrupcion {
    private final ServicioInterrupcion servicioInterrupcion;

    public ControladorInterrupcion(ServicioInterrupcion servicioInterrupcion) {
        this.servicioInterrupcion = servicioInterrupcion;
    }

    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarInterrupcion(@RequestBody InterrupcionDTO interrupcionDTO) {
        try {
            servicioInterrupcion.guardarInterrupcion(interrupcionDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Consultar/Tipo")
    public ResponseEntity<?> consultarTipoInterrupcion() {
        try {
            List<InterrupcionDTO.TipoInterrupcionDTO> tipoInterrupcionDTOList = servicioInterrupcion.traerTipoInterrupcion();
            return ResponseEntity.ok().body(tipoInterrupcionDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
