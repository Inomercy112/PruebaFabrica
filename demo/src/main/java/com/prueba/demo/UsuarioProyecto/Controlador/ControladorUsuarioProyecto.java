package com.prueba.demo.UsuarioProyecto.Controlador;

import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Service.ServicioUsuarioProyecto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarioProyecto")
public class ControladorUsuarioProyecto {
    private final ServicioUsuarioProyecto servicioUsuarioProyecto;
    public ControladorUsuarioProyecto(ServicioUsuarioProyecto servicioUsuarioProyecto) {
        this.servicioUsuarioProyecto = servicioUsuarioProyecto;
    }
    @PutMapping("/Registrar/{idProyecto}/{idUsuario}")
    public ResponseEntity<?> guardarUsuariProyecto(@PathVariable int idProyecto, @PathVariable int idUsuario) {
        try {
            UsuarioProyectoDTO usuarioProyectoDTO = new UsuarioProyectoDTO();
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            ProyectoDTO proyectoDTO = new ProyectoDTO();
            usuarioDTO.setIdDto(idUsuario);
            proyectoDTO.setIdDto(idProyecto);
            usuarioProyectoDTO.setIdUsuarioDto(usuarioDTO);
            usuarioProyectoDTO.setIdProyectoDto(proyectoDTO);
            servicioUsuarioProyecto.guardarUsuarioProyecto(usuarioProyectoDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }
}
