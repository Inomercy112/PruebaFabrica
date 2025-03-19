package com.prueba.demo.Etapa.Controlador;

import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Etapa.ServicioEtapa;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/etapa")
public class ControladorEtapa {
    private final ServicioEtapa servicioEtapa;
    public ControladorEtapa(ServicioEtapa servicioEtapa) {
        this.servicioEtapa = servicioEtapa;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarEtapa(@RequestBody EtapaDTO etapaDTO) {
        try {
            servicioEtapa.registrarEtapa(etapaDTO);
            return ResponseEntity.ok().build();

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarEtapa() {
        try {
            List<EtapaDTO> etapaDTOList = servicioEtapa.obtenerEtapas();
            return ResponseEntity.ok().body(etapaDTOList);

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<?> actualizarEtapa(@RequestBody EtapaDTO etapaDTO, @PathVariable int id) {
        try {
            etapaDTO.setIdDto(id);
            servicioEtapa.registrarEtapa(etapaDTO);
            return ResponseEntity.ok().build();

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
