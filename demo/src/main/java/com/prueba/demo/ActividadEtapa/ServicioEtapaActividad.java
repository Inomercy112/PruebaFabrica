package com.prueba.demo.ActividadEtapa;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Actividad.Repositorio.RepositorioActividad;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.EtapaProyecto.Repositorio.RepositorioEtapaProyecto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioEtapaActividad {
    private final RepositorioActividadEtapa repositorioActividadEtapa;
    private final RepositorioActividad repositorioActividad;
    private final RepositorioEtapaProyecto repositorioEtapaProyecto;

    public ServicioEtapaActividad(RepositorioActividadEtapa repositorioActividadEtapa, RepositorioActividad repositorioActividad, RepositorioEtapaProyecto repositorioEtapaProyecto) {
        this.repositorioActividadEtapa = repositorioActividadEtapa;
        this.repositorioActividad = repositorioActividad;
        this.repositorioEtapaProyecto = repositorioEtapaProyecto;
    }
    public void crearActividadEtapa(ActividadEtapaDTO actividadEtapaDTO) {
        Actividad actividad = repositorioActividad.findById(actividadEtapaDTO.getIdActividadDto().getIdDto()).orElseThrow();
        EtapaProyecto etapaProyecto = repositorioEtapaProyecto.findById(actividadEtapaDTO.getIdDesarrolladorDto().getIdDto());
        ActividadEtapa actividadEtapa = new ActividadEtapa();
        actividadEtapaDTOToEntity(actividadEtapa, actividad, etapaProyecto);
        repositorioActividadEtapa.save(actividadEtapa);

    }
    public List<ActividadEtapaDTO> listarActividadEtapa(int id) {
        return repositorioActividadEtapa.findByIdDesarrollador_Proyecto_Id(id).stream().map(this::actividadEtapaEntityToDTO).toList();
    }

    private void actividadEtapaDTOToEntity( ActividadEtapa actividadEtapa, Actividad actividad, EtapaProyecto etapaProyecto) {
        actividadEtapa.setIdActividad(actividad);
        actividadEtapa.setIdDesarrollador(etapaProyecto);

    }
    private ActividadEtapaDTO actividadEtapaEntityToDTO(ActividadEtapa actividadEtapa) {
        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setIdDto(actividadEtapa.getId());
        actividadDTO.setNombreActividadDto(actividadEtapa.getIdActividad().getNombreActividad());
        EtapaProyectoDTO etapaProyectoDTO = new EtapaProyectoDTO();
        etapaProyectoDTO.setProyectoDto(actividadEtapa.getIdDesarrollador().getId());
        ActividadEtapaDTO actividadEtapaDTO = new ActividadEtapaDTO();
        actividadEtapaDTO.setIdDto(actividadEtapa.getId());
        actividadEtapaDTO.setIdActividadDto(actividadDTO);
        actividadEtapaDTO.setIdDesarrolladorDto(etapaProyectoDTO);
        return actividadEtapaDTO;


    }
}
