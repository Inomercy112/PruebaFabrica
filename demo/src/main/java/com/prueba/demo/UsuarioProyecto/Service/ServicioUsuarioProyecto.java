package com.prueba.demo.UsuarioProyecto.Service;

import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioProyecto;
import com.prueba.demo.Usuario.Modelo.Usuario;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Repositorio.RepositorioUsuarioProyecto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
    public void guardarUsuarioProyecto(UsuarioProyectoDTO usuarioProyectoDTO) {
        Usuario usuario = repositorioUsuario.findById(usuarioProyectoDTO.getIdUsuarioDto().getIdDto()).orElseThrow();
        Proyecto proyecto = repositorioProyecto.findById(usuarioProyectoDTO.getIdProyectoDto().getIdDto()).orElseThrow();
        UsuarioProyecto usuarioProyecto = new UsuarioProyecto();
        usuarioProyectoDTOToEntity(usuarioProyecto, usuario, proyecto);
        repositorioUsuarioProyecto.save(usuarioProyecto);
    }

    private void usuarioProyectoDTOToEntity(UsuarioProyecto usuarioProyecto, Usuario usuario, Proyecto proyecto) {
        usuarioProyecto.setProyecto(proyecto);
        usuarioProyecto.setUsuario(usuario);

    }
}
