package com.prueba.demo.Proyecto.Servicio;

import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
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

    public ServicioProyecto(RepositorioProyecto repositorio, RepositorioEstado repositorioEstado) {
        this.repositorioProyecto = repositorio;
        this.repositorioEstado = repositorioEstado;
    }

    public void registrarProyecto(ProyectoDTO proyectoDTO) {
        Optional<Proyecto> proyectoOptional = repositorioProyecto.findById(proyectoDTO.getIdDto());
        Estado estado = repositorioEstado.findById(proyectoDTO.getEstadoDto());
        Proyecto proyecto;
        if (proyectoOptional.isPresent()) {
            proyecto = proyectoOptional.get();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado);
        }else {
            proyecto = new Proyecto();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado);
        }
        repositorioProyecto.save(proyecto);
    }

    public List<ProyectoDTO> listarProyectos() {
        return repositorioProyecto.findAll().stream().map(this::proyectoEntityToDTO).toList();
    }

    private void proyectoDTOToEntity(ProyectoDTO proyectoDTO, Proyecto proyecto, Estado estado ) {
        proyecto.setDescripcion(proyectoDTO.getDescripcionDto());
        proyecto.setNombre(proyectoDTO.getNombreDto());
        proyecto.setEstado(estado);
    }
    private ProyectoDTO proyectoEntityToDTO(Proyecto proyecto) {
        ProyectoDTO proyectoDTO = new ProyectoDTO();
        proyectoDTO.setDescripcionDto(proyecto.getDescripcion());
        proyectoDTO.setNombreDto(proyecto.getNombre());
        proyectoDTO.setIdDto(proyecto.getId());
        proyectoDTO.setEstadoDto(proyecto.getEstado().getId());
        return proyectoDTO;
    }
}
