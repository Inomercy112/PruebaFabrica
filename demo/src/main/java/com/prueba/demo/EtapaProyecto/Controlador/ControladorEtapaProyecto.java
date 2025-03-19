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

    @PutMapping("/Registrar/{idProyecto}/{idEtapa}")
    public ResponseEntity<?> guardarEtapaProyecto( @PathVariable int idProyecto, @PathVariable int idEtapa) {

        try {
            EtapaProyectoDTO etapaProyectoDTO = new EtapaProyectoDTO();
            etapaProyectoDTO.setProyectoDto(idProyecto);
            etapaProyectoDTO.setEtapaDto(idEtapa);
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
