package com.prueba.demo.Actividad.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;
import com.prueba.demo.Estado.Modelo.Estado;
import com.prueba.demo.Estado.Repositorio.RepositorioEstado;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Etapa.Repositorio.RepositorioEtapa;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.EtapaProyecto.Repositorio.RepositorioEtapaProyecto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioActividad {

    private final RepositorioActividad repositorioActividad;
    private final RepositorioEstado repositorioEstado;
    private final RepositorioEtapa repositorioEtapa;
    private final RepositorioEtapaProyecto repositorioEtapaProyecto;

    public ServicioActividad(RepositorioActividad repositorioActividad, RepositorioEstado repositorioEstado, RepositorioEtapa repositorioEtapa, RepositorioEtapaProyecto repositorioEtapaProyecto) {
        this.repositorioActividad = repositorioActividad;
        this.repositorioEstado = repositorioEstado;
        this.repositorioEtapa = repositorioEtapa;
        this.repositorioEtapaProyecto = repositorioEtapaProyecto;
    }

    public void crearActividad(ActividadDTO actividadDTO) {
        Optional<Actividad> actividadOptional = repositorioActividad.findById(actividadDTO.getIdDto());
        Estado estado = repositorioEstado.findById(actividadDTO.getEstadoActividadDto());
        EtapaProyecto etapaProyecto = repositorioEtapaProyecto.findById(actividadDTO.getEtapaProyectoDTO().getIdDto());
        Actividad actividad;
        if (actividadOptional.isPresent()) {
            actividad = actividadOptional.get();
            actividadDTOToEntity(actividadDTO, actividad, estado, etapaProyecto);
        } else {
            actividad = new Actividad();
            actividadDTOToEntity(actividadDTO, actividad, estado, etapaProyecto);
        }
        repositorioActividad.save(actividad);

    }

    public List<ActividadDTO> listarActividades() {
        return repositorioActividad.findAll().stream().map(this::actividadentityToDTO).toList();
    }

    private void actividadDTOToEntity(ActividadDTO actividadDTO, Actividad actividad, Estado estado, EtapaProyecto etapaProyecto) {
        actividad.setNombreActividad(actividadDTO.getNombreActividadDto());
        actividad.setEstado(estado);
        actividad.setEtapaProyecto(etapaProyecto);

        actividad.setDescripcionActividad(actividadDTO.getDescripcionActividadDto());

    }

    private ActividadDTO actividadentityToDTO(Actividad actividad) {
        ActividadDTO actividadDTO = new ActividadDTO();

        actividadDTO.setIdDto(actividad.getId());
        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());
        actividadDTO.setEstadoActividadDto(actividad.getEstado().getId());

        if (actividad.getEtapaProyecto() != null) {
            EtapaProyectoDTO etapaProyectoDTO = getEtapaProyectoDTO(actividad);

            actividadDTO.setEtapaProyectoDTO(etapaProyectoDTO);
        }

        return actividadDTO;
    }

    private static EtapaProyectoDTO getEtapaProyectoDTO(Actividad actividad) {
        EtapaProyectoDTO etapaProyectoDTO = new EtapaProyectoDTO();
        etapaProyectoDTO.setIdDto(actividad.getEtapaProyecto().getId());
        etapaProyectoDTO.setNombreProyectoDto(actividad.getEtapaProyecto().getProyecto().getNombre());
        etapaProyectoDTO.setProyectoDto(actividad.getEtapaProyecto().getProyecto().getId());

        if (actividad.getEtapaProyecto().getEtapa() != null) {
            EtapaDTO etapaDTO = new EtapaDTO();
            etapaDTO.setIdDto(actividad.getEtapaProyecto().getEtapa().getId());
            etapaDTO.setNombreEtapaDto(actividad.getEtapaProyecto().getEtapa().getNombreEtapa());
            etapaProyectoDTO.setEtapaDto(etapaDTO);
        }
        return etapaProyectoDTO;
    }


}
