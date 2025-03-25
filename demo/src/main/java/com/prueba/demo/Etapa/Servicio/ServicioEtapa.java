package com.prueba.demo.Etapa.Servicio;

import com.prueba.demo.Estado.Modelo.Estado;
import com.prueba.demo.Estado.Repositorio.RepositorioEstado;
import com.prueba.demo.Etapa.DTO.EtapaDTO;
import com.prueba.demo.Etapa.Modelo.Etapa;
import com.prueba.demo.Etapa.Repositorio.RepositorioEtapa;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioEtapa {
    private final RepositorioEtapa repositorioEtapa;
    private final RepositorioEstado repositorioEstado;

    public ServicioEtapa(RepositorioEtapa repositorioEtapa, RepositorioEstado repositorioEstado) {
        this.repositorioEtapa = repositorioEtapa;
        this.repositorioEstado = repositorioEstado;
    }

    public void registrarEtapa(EtapaDTO etapaDTO) {
        Optional<Etapa> etapaOptional = repositorioEtapa.findById(etapaDTO.getIdDto());
        Estado estado = repositorioEstado.findById(etapaDTO.getEstadoDto());

        Etapa etapa;
        if (etapaOptional.isPresent()) {
            etapa = etapaOptional.get();
            etapaDTOToEntity(etapaDTO, etapa, estado);
        } else {
            etapa = new Etapa();
            etapaDTOToEntity(etapaDTO, etapa, estado);
        }

        repositorioEtapa.save(etapa);


    }

    public List<EtapaDTO> obtenerEtapas() {
        return repositorioEtapa.findAll().stream().map(this::etapaEntityToDTO).toList();
    }

    private void etapaDTOToEntity(EtapaDTO etapaDTO, Etapa etapa, Estado estado) {
        etapa.setNombreEtapa(etapaDTO.getNombreEtapaDto());
        etapa.setEstado(estado);
        etapa.setDescripcionEtapa(etapaDTO.getDescripcionEtapaDto());


    }

    private EtapaDTO etapaEntityToDTO(Etapa etapa) {
        EtapaDTO etapaDTO = new EtapaDTO();
        etapaDTO.setIdDto(etapa.getId());
        etapaDTO.setDescripcionEtapaDto(etapa.getDescripcionEtapa());
        etapaDTO.setNombreEtapaDto(etapa.getNombreEtapa());
        etapaDTO.setEstadoDto(etapa.getEstado().getId());
        return etapaDTO;
    }

}
