package com.prueba.demo.EtapaProyecto.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Etapa.Modelo.Etapa;
import com.prueba.demo.Etapa.Repositorio.RepositorioEtapa;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.EtapaProyecto.Repositorio.RepositorioEtapaProyecto;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioProyecto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioEtapaProyecto {
    private final RepositorioEtapaProyecto repositorioEtapaProyecto;
    private final RepositorioProyecto repositorioProyecto;
    private final RepositorioEtapa repositorioEtapa;

    public ServicioEtapaProyecto(RepositorioEtapa repositorioEtapa, RepositorioProyecto repositorioProyecto, RepositorioEtapaProyecto repositorioEtapaProyecto) {
        this.repositorioEtapaProyecto = repositorioEtapaProyecto;
        this.repositorioProyecto = repositorioProyecto;
        this.repositorioEtapa = repositorioEtapa;
    }
    public void crear(EtapaProyectoDTO etapaProyectoDTO) {
        Proyecto proyectoOptional = repositorioProyecto.findById(etapaProyectoDTO.getProyectoDto()).orElseThrow();
        Etapa etapaOptional = repositorioEtapa.findById(etapaProyectoDTO.getEtapaDto().getIdDto()).orElseThrow();
        EtapaProyecto etapaProyecto = new EtapaProyecto();
        etapaProyectoDTOToEntity(proyectoOptional,etapaOptional,etapaProyectoDTO, etapaProyecto);
        repositorioEtapaProyecto.save(etapaProyecto);
    }
    public List<EtapaProyectoDTO> traerEtapasProyecto(int idProyecto) {
        return repositorioEtapaProyecto.findByProyecto_Id(idProyecto).stream().map(this::etapaProyectoEntityToDTO).toList();
    }
    private void etapaProyectoDTOToEntity( Proyecto proyecto, Etapa etapa, EtapaProyectoDTO etapaProyectoDTO, EtapaProyecto etapaProyecto) {
        etapaProyecto.setProyecto(proyecto);
        etapaProyecto.setEtapa(etapa);
        etapaProyecto.setFechaFin(etapaProyectoDTO.getFechaFin());
        etapaProyecto.setFechaInicio(etapaProyectoDTO.getFechaInicio());

    }
    private EtapaProyectoDTO etapaProyectoEntityToDTO(EtapaProyecto etapaProyecto) {
        EtapaProyectoDTO etapaProyectoDTO = new EtapaProyectoDTO();
        etapaProyectoDTO.setIdDto(etapaProyecto.getId());
        etapaProyectoDTO.setFechaFin(etapaProyecto.getFechaFin());
        etapaProyectoDTO.setFechaInicio(etapaProyecto.getFechaInicio());
        etapaProyectoDTO.setProyectoDto(etapaProyecto.getProyecto().getId());
        EtapaDTO etapaDTO = new EtapaDTO();
        etapaDTO.setIdDto(etapaProyecto.getEtapa().getId());
        etapaDTO.setNombreEtapaDto(etapaProyecto.getEtapa().getNombreEtapa());
        etapaDTO.setDescripcionEtapaDto(etapaProyecto.getEtapa().getDescripcionEtapa());
        etapaProyectoDTO.setEtapaDto(etapaDTO);
        if (etapaProyecto.getActividades() != null) {
            List<ActividadDTO> actividadDTOList = etapaProyecto.getActividades().stream()
                    .map(actividad -> {
                        ActividadDTO actividadDTO = new ActividadDTO();
                        actividadDTO.setIdDto(actividad.getId());
                        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
                        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());
                        actividadDTO.setEstadoActividadDto(actividad.getEstado().getId());
                        return actividadDTO;
                    })
                    .collect(Collectors.toList());

            etapaProyectoDTO.setActividadDto(actividadDTOList);
        }


        return etapaProyectoDTO;
    }

}
