package com.prueba.demo.ActividadUsuario.Servicio;

import com.prueba.demo.Actividad.DTO.ActividadDTO;
import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.ActividadEtapa.ActividadEtapa;
import com.prueba.demo.ActividadEtapa.ActividadEtapaDTO;
import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.ActividadUsuario.Repositorio.ActividadUsuarioRepository;
import com.prueba.demo.EtapaProyecto.DTO.EtapaProyectoDTO;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.Usuario.Modelo.Usuario;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActividadUsuarioService {


    private final ActividadUsuarioRepository actividadUsuarioRepository;
    private final RepositorioUsuario repositorioUsuario;

    public ActividadUsuarioService(ActividadUsuarioRepository actividadUsuarioRepository, RepositorioUsuario repositorioUsuario) {
        this.actividadUsuarioRepository = actividadUsuarioRepository;
        this.repositorioUsuario = repositorioUsuario;
    }
    private void actividadUsuarioDTOToEntity(EtapaProyecto etapaProyecto,ActividadUsuarioDTO actividadUsuarioDTO, ActividadUsuario actividadUsuario, ActividadEtapa actividadEtapa) {
        actividadUsuario.setEjecucion(actividadUsuario.getEjecucion());
        actividadUsuario.setIdActividadEtapa(actividadEtapa);
        actividadUsuario.setIdDesarrollador(etapaProyecto);
    }

}
