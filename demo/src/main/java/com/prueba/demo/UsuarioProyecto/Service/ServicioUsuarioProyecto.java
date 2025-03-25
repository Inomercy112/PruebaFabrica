package com.prueba.demo.UsuarioProyecto.Service;

import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioProyecto;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Modelo.Usuario;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Repositorio.RepositorioUsuarioProyecto;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuarioProyecto {

    private final RepositorioUsuarioProyecto repositorioUsuarioProyecto;
    private final RepositorioUsuario repositorioUsuario;
    private final RepositorioProyecto repositorioProyecto;

    public ServicioUsuarioProyecto(RepositorioUsuarioProyecto repositorioUsuarioProyecto, RepositorioUsuario repositorioUsuario, RepositorioProyecto repositorioProyecto) {
        this.repositorioUsuarioProyecto = repositorioUsuarioProyecto;
        this.repositorioUsuario = repositorioUsuario;
        this.repositorioProyecto = repositorioProyecto;
    }
    @Transactional
    public ResponseEntity<?> guardarUsuarioProyecto(UsuarioProyectoDTO usuarioProyectoDTO) {
        Usuario usuario = repositorioUsuario.findById(usuarioProyectoDTO.getIdUsuarioDto().getIdDto()).orElseThrow();
        Proyecto proyecto = repositorioProyecto.findById(usuarioProyectoDTO.getIdProyectoDto().getIdDto()).orElseThrow();
        Optional <UsuarioProyecto> usuarioProyecto2 = repositorioUsuarioProyecto.
                findByProyecto_IdAndUsuario_Id(usuarioProyectoDTO.getIdProyectoDto().getIdDto(), usuarioProyectoDTO.getIdUsuarioDto().getIdDto());
        if(usuarioProyecto2.isPresent()) {
            return ResponseEntity.badRequest().body("Usuario ya existe");
        }
         UsuarioProyecto usuarioProyecto = new UsuarioProyecto();
        usuarioProyectoDTOToEntity(usuarioProyecto, usuario, proyecto);
        repositorioUsuarioProyecto.save(usuarioProyecto);
        return ResponseEntity.ok().body("Usuario guardado");
    }

    public List <UsuarioProyectoDTO> traerUsuarioProyectoDTO(int proyecto) {
        return repositorioUsuarioProyecto.findByProyecto_id(proyecto).stream().map(this::usuarioProyectoEntityToDTO).toList();
    }

    private void usuarioProyectoDTOToEntity(UsuarioProyecto usuarioProyecto, Usuario usuario, Proyecto proyecto) {
        usuarioProyecto.setProyecto(proyecto);
        usuarioProyecto.setUsuario(usuario);

    }
    private UsuarioProyectoDTO usuarioProyectoEntityToDTO(UsuarioProyecto usuarioProyecto) {
        UsuarioProyectoDTO usuarioProyectoDTO = new UsuarioProyectoDTO();
        usuarioProyectoDTO.setIdDto(usuarioProyecto.getId());
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        Usuario usuario = repositorioUsuario.findById(usuarioProyecto.getUsuario().getId()).orElseThrow();
        usuarioDTO.setIdDto(usuario.getId());
        usuarioDTO.setNombreDto(usuario.getNombre());
        usuarioDTO.setApellidoDto(usuario.getApellido());
        usuarioDTO.setProfesionDto(usuario.getProfesion());
        usuarioProyectoDTO.setIdUsuarioDto(usuarioDTO);
        return usuarioProyectoDTO;
    }
}
