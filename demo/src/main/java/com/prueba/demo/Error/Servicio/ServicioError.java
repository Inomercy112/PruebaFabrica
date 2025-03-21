package com.prueba.demo.Error.Servicio;

import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.Error.DTO.ErrorDTO;
import com.prueba.demo.Error.Modelo.ErrorEntity;
import com.prueba.demo.Error.Modelo.TipoError;
import com.prueba.demo.Error.Repositorio.RepositorioError;
import com.prueba.demo.Error.Repositorio.RepositorioTipoError;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioError {
    private final RepositorioError repositorioError;
    private final ActividadUsuarioRepository actividadUsuarioRepository;
    private final RepositorioTipoError repositorioTipoError;

    public ServicioError(RepositorioError repositorioError, ActividadUsuarioRepository actividadUsuarioRepository, RepositorioTipoError repositorioTipoError) {
        this.repositorioError = repositorioError;
        this.repositorioTipoError = repositorioTipoError;
        this.actividadUsuarioRepository = actividadUsuarioRepository;
    }

    public List<ErrorDTO.TipoErrorDTO> obtenerTIposErrores() {
        return repositorioTipoError.findAll().stream().map(this::tipoErrorEntityToDTO).toList();
    }

    public void guardarError(ErrorDTO errorDTO) {
        ErrorEntity errorEntity = new ErrorEntity();
        ActividadUsuario actividadUsuario = actividadUsuarioRepository.findById(errorDTO.getActividadUsuarioDTO().getIdActividadEtapaDto().get(0).getIdDto()).orElse(null);
        TipoError tipoError = repositorioTipoError.findById(errorDTO.getTipoErrorDTO().getIdDto()).orElse(null);
        errorDTOToEntity(errorDTO, errorEntity,actividadUsuario,tipoError);
        repositorioError.save(errorEntity);
    }

    public void errorDTOToEntity(ErrorDTO errorDTO, ErrorEntity errorEntity, ActividadUsuario actividadUsuario, TipoError tipoError) {
        errorEntity.setDescripcionError(errorDTO.getDescripcionErrorDto());
        errorEntity.setActividadUsuario(actividadUsuario);
        errorEntity.setTipoError(tipoError);

    }
    public ErrorDTO.TipoErrorDTO tipoErrorEntityToDTO(TipoError tipoError) {
        ErrorDTO.TipoErrorDTO tipoErrorDTO = new ErrorDTO.TipoErrorDTO();
        tipoErrorDTO.setIdDto(tipoError.getId());
        tipoErrorDTO.setNombreError(tipoError.getNombreError());
        return tipoErrorDTO;
    }

}
