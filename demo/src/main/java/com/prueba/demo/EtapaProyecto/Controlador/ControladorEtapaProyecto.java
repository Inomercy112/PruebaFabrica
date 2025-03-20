package com.prueba.demo.EtapaProyecto.Controlador;

import com.prueba.demo.Etapa.Modelo.Etapa;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.EtapaProyecto.Servicio.ServicioEtapaProyecto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/etapaProyecto")
public class ControladorEtapaProyecto {
    private final ServicioEtapaProyecto servicioEtapaProyecto;

    public ControladorEtapaProyecto(ServicioEtapaProyecto servicioEtapaProyecto) {
        this.servicioEtapaProyecto = servicioEtapaProyecto;
    }

    @PostMapping("/Registrar")
    public ResponseEntity<?> guardarEtapaProyecto(@RequestBody EtapaProyectoDTO etapaProyectoDTO ) {

        try {

            servicioEtapaProyecto.crear(etapaProyectoDTO);
            return ResponseEntity.ok().build();

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<?> consultarEtapaProyecto(@PathVariable int id) {
        try {
            List <EtapaProyectoDTO> etapaProyectoDTOList = servicioEtapaProyecto.traerEtapasProyecto(id);
            return ResponseEntity.ok().body(etapaProyectoDTOList);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
