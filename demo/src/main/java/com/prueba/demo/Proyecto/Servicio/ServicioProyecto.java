package com.prueba.demo.Proyecto.Servicio;

import com.prueba.demo.Estado.Modelo.Estado;
import com.prueba.demo.Estado.Repositorio.RepositorioEstado;
import com.prueba.demo.Proyecto.DTO.ProyectoDTO;
import com.prueba.demo.Proyecto.Modelo.EstadoProyecto;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Proyecto.Modelo.TipoProyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioEstadoProyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioProyecto;
import com.prueba.demo.Proyecto.Repositorio.RepositorioTipoProyecto;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import com.prueba.demo.UsuarioProyecto.Repositorio.RepositorioUsuarioProyecto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioProyecto {

    private final RepositorioProyecto repositorioProyecto;
    private final RepositorioEstado repositorioEstado;
    private final RepositorioEstadoProyecto repositorioEstadoProyecto;
    private final RepositorioTipoProyecto repositorioTipoProyecto;
    private final RepositorioUsuarioProyecto repositorioUsuarioProyecto;

    public ServicioProyecto(RepositorioProyecto repositorio, RepositorioEstado repositorioEstado, RepositorioEstadoProyecto repositorioEstadoProyecto, RepositorioTipoProyecto repositorioTipoProyecto, RepositorioUsuarioProyecto repositorioUsuarioProyecto) {
        this.repositorioProyecto = repositorio;
        this.repositorioEstado = repositorioEstado;
        this.repositorioEstadoProyecto = repositorioEstadoProyecto;
        this.repositorioTipoProyecto = repositorioTipoProyecto;
        this.repositorioUsuarioProyecto = repositorioUsuarioProyecto;
    }

    public void registrarProyecto(ProyectoDTO proyectoDTO) {
        EstadoProyecto estadoProyecto = repositorioEstadoProyecto.findById(proyectoDTO.getEstadoProyectoDto().getIdDto());
        Optional<Proyecto> proyectoOptional = repositorioProyecto.findById(proyectoDTO.getIdDto());
        TipoProyecto tipoProyecto = repositorioTipoProyecto.findById(proyectoDTO.getTipoProyectoDto().getIdDto()).orElse(null);
        Estado estado = repositorioEstado.findById(proyectoDTO.getEstadoDto());
        Proyecto proyecto;
        if (proyectoOptional.isPresent()) {
            proyecto = proyectoOptional.get();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado, estadoProyecto, tipoProyecto);
        } else {
            proyecto = new Proyecto();
            proyectoDTOToEntity(proyectoDTO, proyecto, estado, estadoProyecto, tipoProyecto);
        }
        repositorioProyecto.save(proyecto);
    }

    public List<ProyectoDTO> listarProyectos() {
        return repositorioProyecto.findAll().stream().map(this::proyectoEntityToDTO).toList();
    }

    public Optional<ProyectoDTO> buscarProyectoPorId(int idProyecto) {
        return repositorioProyecto.findById(idProyecto).map(this::proyectoEntityToDTO);
    }

    public List<ProyectoDTO.TipoProyectoDto> listarTipoProyectos() {
        return repositorioTipoProyecto.findAll()
                .stream()
                .map(this::tipoProyectoEntityToDTO)
                .toList();
    }

    public List<ProyectoDTO.EstadoProyectoDto> listarEstadoProyectos() {
        return repositorioEstadoProyecto.findAll().stream().map(this::estadoProyectoEntityToDTO).toList();
    }

    public List<UsuarioDTO> buscarProyectoPorUsuario(int idUsuario) {
        return repositorioUsuarioProyecto.findByProyecto_id(idUsuario)
                .stream()
                .map(this::convertirAUsuarioDTO)
                .toList();
    }

    private UsuarioDTO convertirAUsuarioDTO(UsuarioProyecto usuarioProyecto) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdDto(usuarioProyecto.getUsuario().getId());
        dto.setNombreDto(usuarioProyecto.getUsuario().getNombre());
        dto.setApellidoDto(usuarioProyecto.getUsuario().getApellido());

        return dto;
    }


    private void proyectoDTOToEntity(ProyectoDTO proyectoDTO, Proyecto proyecto, Estado estado, EstadoProyecto estadoProyecto, TipoProyecto tipoProyecto) {
        proyecto.setTipoProyecto(tipoProyecto);
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
        ProyectoDTO.TipoProyectoDto tipoProyectoDto = new ProyectoDTO.TipoProyectoDto();
        tipoProyectoDto.setIdDto(proyecto.getTipoProyecto().getId());
        tipoProyectoDto.setNombreTipoProyectoDto(proyecto.getTipoProyecto().getNombreTipoProyecto());
        proyectoDTO.setTipoProyectoDto(tipoProyectoDto);
        return proyectoDTO;
    }

    private ProyectoDTO.TipoProyectoDto tipoProyectoEntityToDTO(TipoProyecto tipoProyecto) {
        ProyectoDTO.TipoProyectoDto tipoProyectoDto = new ProyectoDTO.TipoProyectoDto();
        tipoProyectoDto.setIdDto(tipoProyecto.getId());
        tipoProyectoDto.setNombreTipoProyectoDto(tipoProyecto.getNombreTipoProyecto());
        return tipoProyectoDto;
    }

    private ProyectoDTO.EstadoProyectoDto estadoProyectoEntityToDTO(EstadoProyecto estadoProyecto) {
        ProyectoDTO.EstadoProyectoDto estadoProyectoDto = new ProyectoDTO.EstadoProyectoDto();
        estadoProyectoDto.setIdDto(estadoProyecto.getId());
        estadoProyectoDto.setNombreEstadoDto(estadoProyecto.getNombreEstadoProyecto())
        ;
        return estadoProyectoDto;
    }
}
