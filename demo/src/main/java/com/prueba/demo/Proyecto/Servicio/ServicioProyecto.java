package com.prueba.demo.Proyecto.Servicio;

import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Modelo.EstadoProyecto;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioEstadoProyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioProyecto;
import com.prueba.demo.Usuario.Modelo.Estado;
import com.prueba.demo.Usuario.Repositorio.RepositorioEstado;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioProyecto {

    private final RepositorioProyecto repositorioProyecto;
    private final RepositorioEstado repositorioEstado;
    private final RepositorioEstadoProyecto repositorioEstadoProyecto;

    public ServicioProyecto(RepositorioProyecto repositorio, RepositorioEstado repositorioEstado, RepositorioEstadoProyecto repositorioEstadoProyecto) {
        this.repositorioProyecto = repositorio;
        this.repositorioEstado = repositorioEstado;
        this.repositorioEstadoProyecto = repositorioEstadoProyecto;
    }

    public void registrarProyecto(ProyectoDTO proyectoDTO) {
        EstadoProyecto estadoProyecto = repositorioEstadoProyecto.findById(proyectoDTO.getEstadoProyectoDto().getIdDto());
        Optional<Proyecto> proyectoOptional = repositorioProyecto.findById(proyectoDTO.getIdDto());
        Estado estado = repositorioEstado.findById(proyectoDTO.getEstadoDto());
        Proyecto proyecto;
        if (proyectoOptional.isPresent()) {
            proyecto = proyectoOptional.get();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado, estadoProyecto);
        }else {
            proyecto = new Proyecto();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado, estadoProyecto);
        }
        repositorioProyecto.save(proyecto);
    }

    public List<ProyectoDTO> listarProyectos() {
        return repositorioProyecto.findAll().stream().map(this::proyectoEntityToDTO).toList();
    }

    private void proyectoDTOToEntity(ProyectoDTO proyectoDTO, Proyecto proyecto, Estado estado, EstadoProyecto estadoProyecto ) {
        proyecto.setEstadoProyecto(estadoProyecto);
        proyecto.setDescripcion(proyectoDTO.getDescripcionDto());
        proyecto.setNombre(proyectoDTO.getNombreDto());
        proyecto.setDiaInicio(proyectoDTO.getDiaInicioDto());
        proyecto.setDiaFin(proyectoDTO.getDiaFinDto());
        proyecto.setEstado(estado);
    }
    private ProyectoDTO proyectoEntityToDTO(Proyecto proyecto) {
        ProyectoDTO proyectoDTO = new ProyectoDTO();
        proyectoDTO.setDescripcionDto(proyecto.getDescripcion());
        proyectoDTO.setNombreDto(proyecto.getNombre());
        proyectoDTO.setIdDto(proyecto.getId());
        proyectoDTO.setDiaInicioDto(proyecto.getDiaInicio());
        proyectoDTO.setDiaFinDto(proyecto.getDiaFin());
        proyectoDTO.setEstadoDto(proyecto.getEstado().getId());
        ProyectoDTO.EstadoProyectoDto estadoProyectoDto = new ProyectoDTO.EstadoProyectoDto();
        estadoProyectoDto.setIdDto(proyecto.getEstadoProyecto().getId());
        estadoProyectoDto.setNombreEstadoDto(proyecto.getEstadoProyecto().getNombreEstadoProyecto());
        proyectoDTO.setEstadoProyectoDto(estadoProyectoDto);
        return proyectoDTO;
    }
}
