package com.prueba.demo.ActividadUsuario.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
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
import java.util.Optional;


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
        UsuarioProyecto usuarioProyecto = repositorioUsuarioProyecto.findById(actividadUsuarioDTO.getIdDesarrolladorDto().getIdDto()).orElseThrow();

        for (ActividadDTO actividadDTO : actividadUsuarioDTO.getIdActividadEtapaDto()) {
            Optional<Actividad> actividadOptional = repositorioActividad.findById(actividadDTO.getIdDto());

            if (actividadOptional.isEmpty()) {
                throw new RuntimeException("Actividad no encontrada para el ID: " + actividadDTO.getIdDto());
            }

            Actividad actividad = actividadOptional.get();
            ActividadUsuario actividadUsuario = new ActividadUsuario();
            actividadUsuarioDTOToEntity(usuarioProyecto,actividadUsuarioDTO,actividadUsuario,actividad);

            actividadUsuarioRepository.save(actividadUsuario);
        }
    }


    public List<ActividadUsuarioDTO> traerActivdadesUsuario(int id){
        return actividadUsuarioRepository.findByIdDesarrollador_Usuario_Id(id).stream().map(this ::entityToDTO).toList();
    }
    public List<ActividadUsuarioDTO> traerActivdadesProyecto(int id){
        return actividadUsuarioRepository.findByIdDesarrollador_Proyecto_Id(id).stream().map(this ::entityToDTO).toList();
    }




    private void actividadUsuarioDTOToEntity(UsuarioProyecto usuarioProyecto,ActividadUsuarioDTO actividadUsuarioDTO, ActividadUsuario actividadUsuario, Actividad actividad) {
        actividadUsuario.setEjecucion(actividadUsuarioDTO.getEjecucionDto());
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
        usuarioDTO.setNombreDto(actividadUsuario.getIdDesarrollador().getUsuario().getNombre());
        usuarioDTO.setApellidoDto(actividadUsuario.getIdDesarrollador().getUsuario().getApellido());
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
        if (actividadUsuario == null || actividadUsuario.getIdActividadEtapa() == null) {
            return null;
        }

        Actividad actividad = actividadUsuario.getIdActividadEtapa();
        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setIdDto(actividad.getId());
        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());

        if (actividad.getEstado() != null) {
            actividadDTO.setEstadoActividadDto(actividad.getEstado().getId());
        }

        if (actividad.getEtapaProyecto() != null) {
            EtapaProyectoDTO etapaProyectoDTO = new EtapaProyectoDTO();
            etapaProyectoDTO.setIdDto(actividad.getEtapaProyecto().getId());

            if (actividad.getEtapaProyecto().getProyecto() != null) {
                etapaProyectoDTO.setProyectoDto(actividad.getEtapaProyecto().getProyecto().getId());
                etapaProyectoDTO.setNombreProyectoDto(actividad.getEtapaProyecto().getProyecto().getNombre());
            }

            if (actividad.getEtapaProyecto().getEtapa() != null) {
                EtapaDTO etapaDTO = getEtapaDTO(actividad);

                etapaProyectoDTO.setEtapaDto(etapaDTO);
            }

            actividadDTO.setEtapaProyectoDTO(etapaProyectoDTO);
        }

        return actividadDTO;
    }

    private static EtapaDTO getEtapaDTO(Actividad actividad) {
        EtapaDTO etapaDTO = new EtapaDTO();
        etapaDTO.setIdDto(actividad.getEtapaProyecto().getEtapa().getId());
        etapaDTO.setNombreEtapaDto(actividad.getEtapaProyecto().getEtapa().getNombreEtapa());
        etapaDTO.setDescripcionEtapaDto(actividad.getEtapaProyecto().getEtapa().getDescripcionEtapa());

        if (actividad.getEtapaProyecto().getEtapa().getEstado() != null) {
            etapaDTO.setEstadoDto(actividad.getEtapaProyecto().getEtapa().getEstado().getId());
        }
        return etapaDTO;
    }


}
