package com.prueba.demo.Interrupcion.Servicio;

import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.Interrupcion.DTO.InterrupcionDTO;
import com.prueba.demo.Interrupcion.Modelo.Interrupcion;
import com.prueba.demo.Interrupcion.Modelo.TipoInterrupcion;
import com.prueba.demo.Interrupcion.Repositorio.RepositorioInterrupcion;
import com.prueba.demo.Interrupcion.Repositorio.RepositorioTipoInterrupcion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioInterrupcion {
    private final RepositorioInterrupcion repositorioInterrupcion;
    private final ActividadUsuarioRepository actividadUsuarioRepository;
    private final RepositorioTipoInterrupcion repositorioTipoInterrupcion;

    public ServicioInterrupcion(RepositorioInterrupcion repositorioInterrupcion, ActividadUsuarioRepository actividadUsuarioRepository, RepositorioTipoInterrupcion repositorioTipoInterrupcion) {
        this.repositorioInterrupcion = repositorioInterrupcion;
        this.actividadUsuarioRepository = actividadUsuarioRepository;
        this.repositorioTipoInterrupcion = repositorioTipoInterrupcion;
    }

    public void guardarInterrupcion(InterrupcionDTO interrupcionDTO) {
        ActividadUsuario actividadUsuario = actividadUsuarioRepository.findById(interrupcionDTO.getActividadUsuarioDTO().getIdDto()).orElseThrow();
        TipoInterrupcion tipoInterrupcion = repositorioTipoInterrupcion.findById(interrupcionDTO.getTipoInterrupcionDTO().getIdDto()).orElseThrow();
        Interrupcion interrupcion = new Interrupcion();
        interrupcionDTOToEntity(actividadUsuario, tipoInterrupcion, interrupcion, interrupcionDTO);
        repositorioInterrupcion.save(interrupcion);
    }

    public List<InterrupcionDTO.TipoInterrupcionDTO> traerTipoInterrupcion() {
        return repositorioTipoInterrupcion.findAll().stream().map(this::toTipoInterrupcionDTO).toList();
    }

    private void interrupcionDTOToEntity(ActividadUsuario actividadUsuario, TipoInterrupcion tipoInterrupcion, Interrupcion interrupcion, InterrupcionDTO interrupcionDTO) {
        interrupcion.setTipoInterrupcion(tipoInterrupcion);
        interrupcion.setDuracion(interrupcionDTO.getDuracionDto());
        interrupcion.setFecha(interrupcionDTO.getFechaDto());
        interrupcion.setActividadUsuario(actividadUsuario);

    }

    private InterrupcionDTO.TipoInterrupcionDTO toTipoInterrupcionDTO(TipoInterrupcion tipoInterrupcion) {
        InterrupcionDTO.TipoInterrupcionDTO tipoInterrupcionDTO = new InterrupcionDTO.TipoInterrupcionDTO();
        tipoInterrupcionDTO.setNombreTipoInterrupcionDto(tipoInterrupcion.getNombreTipoInterrupcion());
        tipoInterrupcionDTO.setIdDto(tipoInterrupcion.getId());
        return tipoInterrupcionDTO;
    }
}
