package com.prueba.demo.ActividadUsuario.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Servicio.ServicioProyecto;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import com.prueba.demo.Usuario.Servicio.ServicioUsuario;
import com.prueba.demo.UsuarioProyecto.DTO.UsuarioProyectoDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Repositorio.RepositorioUsuarioProyecto;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


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
    public List<ActividadUsuarioDTO> traerActivdadesUsuario(int id){
        return actividadUsuarioRepository.findByIdDesarrollador_Usuario_Id(id).stream().map(this ::entityToDTO).toList();
    }



    private void actividadUsuarioDTOToEntity(UsuarioProyecto usuarioProyecto,ActividadUsuarioDTO actividadUsuarioDTO, ActividadUsuario actividadUsuario, Actividad actividad) {
        actividadUsuario.setEjecucion(actividadUsuarioDTO.getEjecucionDto());
        actividadUsuario.setIdActividadEtapa(actividadUsuario.getIdActividadEtapa());
        actividadUsuario.setIdDesarrollador(usuarioProyecto);
        actividadUsuario.setIdActividadEtapa(actividad);
    }
    private ActividadUsuarioDTO entityToDTO(ActividadUsuario actividadUsuario) {
        ActividadUsuarioDTO actividadUsuarioDTO = new ActividadUsuarioDTO();
        actividadUsuarioDTO.setIdDto(actividadUsuario.getId());
        actividadUsuarioDTO.setEjecucionDto(actividadUsuario.getEjecucion());

        UsuarioProyectoDTO usuarioProyectoDTO = new UsuarioProyectoDTO();
        usuarioProyectoDTO.setIdDto(actividadUsuario.getIdDesarrollador().getUsuario().getId());

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setIdDto(actividadUsuario.getIdDesarrollador().getUsuario().getId());
        usuarioProyectoDTO.setIdUsuarioDto(usuarioDTO);

        ProyectoDTO proyectoDTO = getProyectoDTO(actividadUsuario);

        usuarioProyectoDTO.setIdProyectoDto(proyectoDTO);
        actividadUsuarioDTO.setIdDesarrolladorDto(usuarioProyectoDTO);

        List<ActividadDTO> actividades = new ArrayList<>();
        if (actividadUsuario.getIdActividadEtapa() != null) {
            ActividadDTO actividadDTO = getActividadDTO(actividadUsuario);
            actividades.add(actividadDTO);
        }

        actividadUsuarioDTO.setIdActividadEtapaDto(actividades);

        return actividadUsuarioDTO;
    }

    private static ProyectoDTO getProyectoDTO(ActividadUsuario actividadUsuario) {
        ProyectoDTO proyectoDTO = new ProyectoDTO();
        proyectoDTO.setIdDto(actividadUsuario.getIdDesarrollador().getProyecto().getId());
        proyectoDTO.setNombreDto(actividadUsuario.getIdDesarrollador().getProyecto().getNombre());
        proyectoDTO.setDescripcionDto(actividadUsuario.getIdDesarrollador().getProyecto().getDescripcion());
        proyectoDTO.setEstadoDto(actividadUsuario.getIdDesarrollador().getProyecto().getEstado().getId());

        ProyectoDTO.EstadoProyectoDto estadoProyectoDTO = new ProyectoDTO.EstadoProyectoDto();
        estadoProyectoDTO.setIdDto(actividadUsuario.getIdDesarrollador().getProyecto().getEstadoProyecto().getId());
        estadoProyectoDTO.setNombreEstadoDto(actividadUsuario.getIdDesarrollador().getProyecto().getEstadoProyecto().getNombreEstadoProyecto());

        proyectoDTO.setEstadoProyectoDto(estadoProyectoDTO);
        proyectoDTO.setDiaInicioDto(actividadUsuario.getIdDesarrollador().getProyecto().getDiaInicio());
        proyectoDTO.setDiaFinDto(actividadUsuario.getIdDesarrollador().getProyecto().getDiaFin());

        ProyectoDTO.TipoProyectoDto tipoProyectoDTO = new ProyectoDTO.TipoProyectoDto();
        tipoProyectoDTO.setIdDto(actividadUsuario.getIdDesarrollador().getProyecto().getTipoProyecto().getId());
        tipoProyectoDTO.setNombreTipoProyectoDto(actividadUsuario.getIdDesarrollador().getProyecto().getTipoProyecto().getNombreTipoProyecto());
        proyectoDTO.setTipoProyectoDto(tipoProyectoDTO);
        return proyectoDTO;
    }

    private static ActividadDTO getActividadDTO(ActividadUsuario actividadUsuario) {
        Actividad actividad = actividadUsuario.getIdActividadEtapa();
        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setIdDto(actividad.getId());
        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());
        actividadDTO.setEstadoActividadDto(actividad.getEstado().getId());

        EtapaDTO etapaDTO = new EtapaDTO();
        etapaDTO.setIdDto(actividad.getEtapa().getId());
        etapaDTO.setNombreEtapaDto(actividad.getEtapa().getNombreEtapa());
        etapaDTO.setDescripcionEtapaDto(actividad.getEtapa().getDescripcionEtapa());
        etapaDTO.setEstadoDto(actividad.getEtapa().getEstado().getId());

        actividadDTO.setEtapaDto(etapaDTO);
        return actividadDTO;
    }


}
