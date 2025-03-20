package com.prueba.demo.Actividad.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;
import com.prueba.demo.Usuario.Modelo.Estado;
import com.prueba.demo.Usuario.Repositorio.RepositorioEstado;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioActividad {

    private final RepositorioActividad repositorioActividad;
    private final RepositorioEstado repositorioEstado;

    public ServicioActividad(RepositorioActividad repositorioActividad, RepositorioEstado repositorioEstado) {
        this.repositorioActividad = repositorioActividad;
        this.repositorioEstado = repositorioEstado;
    }

    public void crearActividad(ActividadDTO actividadDTO) {
        Optional <Actividad> actividadOptional = repositorioActividad.findById(actividadDTO.getIdDto());
        Estado estado = repositorioEstado.findById(actividadDTO.getEstadoActividadDto());
        Actividad actividad;
        if(actividadOptional.isPresent()) {
            actividad = actividadOptional.get();
            actividadDTOToEntity(actividadDTO, actividad, estado);
        }else {
            actividad = new Actividad();
            actividadDTOToEntity(actividadDTO, actividad, estado);
        }
        repositorioActividad.save(actividad);

    }
    public List<ActividadDTO> listarActividades() {
        return repositorioActividad.findAll().stream().map(this ::actividadentityToDTO).toList();
    }

    private void actividadDTOToEntity(ActividadDTO actividadDTO, Actividad actividad, Estado estado) {
        actividad.setNombreActividad(actividadDTO.getNombreActividadDto());
        actividad.setEstado(estado);
        actividad.setDescripcionActividad(actividadDTO.getDescripcionActividadDto());

    }
    private ActividadDTO actividadentityToDTO(Actividad actividad) {
        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setIdDto(actividad.getId());

        actividadDTO.setNombreActividadDto(actividad.getNombreActividad());
        actividadDTO.setDescripcionActividadDto(actividad.getDescripcionActividad());
        return actividadDTO;
    }

}
