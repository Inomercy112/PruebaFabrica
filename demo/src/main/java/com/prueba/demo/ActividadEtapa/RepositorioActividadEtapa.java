package com.prueba.demo.ActividadEtapa;

import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioActividadEtapa extends JpaRepository<ActividadEtapa, Integer> {
    List<ActividadEtapa> findByIdDesarrollador_Proyecto_Id(int actividad);
    List<ActividadEtapa> findByIdDesarrollador(EtapaProyecto etapaProyecto);

}
