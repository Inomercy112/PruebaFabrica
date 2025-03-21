package com.prueba.demo.EtapaProyecto.Repositorio;

import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioEtapaProyecto extends JpaRepository<EtapaProyecto, Long> {
    List<EtapaProyecto> findByProyecto_Id(int proyecto);
    EtapaProyecto findById(int id);
    EtapaProyecto findByIdAndEtapa_Id(int id, int etapa);

}
