package com.prueba.demo.ActividadUsuario.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Servicio.ServicioProyecto;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import com.prueba.demo.Usuario.Servicio.ServicioUsuario;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Repositorio.RepositorioUsuarioProyecto;

import org.springframework.stereotype.Service;


@Service
public class ActividadUsuarioService {


    private final ActividadUsuarioRepository actividadUsuarioRepository;
    private final RepositorioUsuario repositorioUsuario;
    private final ServicioUsuario servicioUsuario;
    private final ServicioProyecto servicioProyecto;
    private final RepositorioUsuarioProyecto repositorioUsuarioProyecto;
    private final RepositorioActividad repositorioActividad;

    public ActividadUsuarioService(ActividadUsuarioRepository actividadUsuarioRepository, RepositorioUsuario repositorioUsuario, ServicioUsuario servicioUsuario, ServicioProyecto servicioProyecto, RepositorioUsuarioProyecto repositorioUsuarioProyecto, RepositorioActividad repositorioActividad) {
        this.actividadUsuarioRepository = actividadUsuarioRepository;
        this.repositorioUsuario = repositorioUsuario;
        this.servicioUsuario = servicioUsuario;
        this.servicioProyecto = servicioProyecto;
        this.repositorioUsuarioProyecto = repositorioUsuarioProyecto;

        this.repositorioActividad = repositorioActividad;
    }
    public void guardarActividadUsuario(ActividadUsuarioDTO actividadUsuarioDTO) {
        ActividadUsuario actividadUsuario = new ActividadUsuario();
        System.out.println(actividadUsuarioDTO.getIdDesarrolladorDto().getIdUsuarioDto());
        UsuarioProyecto usuarioProyecto = repositorioUsuarioProyecto.findByIdProyecto(actividadUsuarioDTO.getIdDesarrolladorDto().getIdUsuarioDto().getIdDto());

        Actividad actividad = repositorioActividad.findById(actividadUsuarioDTO.getIdActividadEtapaDto().get(0).getIdDto()).orElse(null);
        actividadUsuarioDTOToEntity(usuarioProyecto,actividadUsuarioDTO,actividadUsuario,actividad);
        actividadUsuarioRepository.save(actividadUsuario);

    }



    private void actividadUsuarioDTOToEntity(UsuarioProyecto usuarioProyecto,ActividadUsuarioDTO actividadUsuarioDTO, ActividadUsuario actividadUsuario, Actividad actividad) {
        actividadUsuario.setEjecucion(actividadUsuarioDTO.getEjecucionDto());
        actividadUsuario.setIdActividadEtapa(actividadUsuario.getIdActividadEtapa());
        actividadUsuario.setIdDesarrollador(usuarioProyecto);
        actividadUsuario.setIdActividadEtapa(actividad);
    }
    private ActividadUsuarioDTO entityToDTO(ActividadUsuario actividadUsuario) {
        ActividadUsuarioDTO actividadUsuarioDTO = new ActividadUsuarioDTO();
        actividadUsuarioDTO.setEjecucionDto(actividadUsuario.getEjecucion());
        actividadUsuarioDTO.setIdDto(actividadUsuario.getId());


        UsuarioDTO usuarioDTO = servicioUsuario.buscarPorId(actividadUsuario.getIdDesarrollador().getUsuario().getId()).orElseThrow();
        UsuarioProyectoDTO usuarioProyectoDTO = new UsuarioProyectoDTO();
        usuarioProyectoDTO.setIdUsuarioDto(usuarioDTO);
        ProyectoDTO proyectoDTO = servicioProyecto.buscarProyectoPorId(actividadUsuario.getIdDesarrollador().getProyecto().getId()).orElseThrow();

        usuarioProyectoDTO.setIdProyectoDto(proyectoDTO);
        usuarioProyectoDTO.setIdDto(actividadUsuario.getIdDesarrollador().getIdProyecto());
        actividadUsuarioDTO.setIdDesarrolladorDto(usuarioProyectoDTO);
        return actividadUsuarioDTO;
    }

}
