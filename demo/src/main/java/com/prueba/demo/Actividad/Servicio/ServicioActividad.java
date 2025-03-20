package com.prueba.demo.Actividad.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;
import com.prueba.demo.Estado.Modelo.Estado;
import com.prueba.demo.Estado.Repositorio.RepositorioEstado;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Etapa.Modelo.Etapa;
import com.prueba.demo.Etapa.Repositorio.RepositorioEtapa;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioActividad {

    private final RepositorioActividad repositorioActividad;
    private final RepositorioEstado repositorioEstado;
    private final RepositorioEtapa repositorioEtapa;

    public ServicioActividad(RepositorioActividad repositorioActividad, RepositorioEstado repositorioEstado, RepositorioEtapa repositorioEtapa) {
        this.repositorioActividad = repositorioActividad;
        this.repositorioEstado = repositorioEstado;
        this.repositorioEtapa = repositorioEtapa;
    }

    public void crearActividad(ActividadDTO actividadDTO) {
        Optional <Actividad> actividadOptional = repositorioActividad.findById(actividadDTO.getIdDto());
        Estado estado = repositorioEstado.findById(actividadDTO.getEstadoActividadDto());
        Etapa etapa =repositorioEtapa.findById(actividadDTO.getEtapaDto().getIdDto()).orElse(null);
        Actividad actividad;
        if(actividadOptional.isPresent()) {
            actividad = actividadOptional.get();
            actividadDTOToEntity(actividadDTO, actividad, estado, etapa);
        }else {
            actividad = new Actividad();
            actividadDTOToEntity(actividadDTO, actividad, estado, etapa);
        }
        repositorioActividad.save(actividad);

    }
    public List<ActividadDTO> listarActividades() {
        return repositorioActividad.findAll().stream().map(this ::actividadentityToDTO).toList();
    }

    private void actividadDTOToEntity(ActividadDTO actividadDTO, Actividad actividad, Estado estado, Etapa etapa) {
        actividad.setNombreActividad(actividadDTO.getNombreActividadDto());
        actividad.setEstado(estado);
        actividad.setEtapa(etapa);
        actividad.setDescripcionActividad(actividadDTO.getDescripcionActividadDto());

    }
    private ActividadDTO actividadentityToDTO(Actividad actividad) {
        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setIdDto(actividad.getId());
        EtapaDTO etapaDTO = new EtapaDTO();
        etapaDTO.setIdDto(actividad.getEtapa().getId());
        etapaDTO.setNombreEtapaDto(actividad.getEtapa().getNombreEtapa());
        etapaDTO.setDescripcionEtapaDto(actividad.getEtapa().getDescripcionEtapa());
        actividadDTO.setEtapaDto(etapaDTO);
        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());
        return actividadDTO;
    }

}
