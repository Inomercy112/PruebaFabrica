package com.prueba.demo.Proyecto.Repositorio;

import com.prueba.demo.Proyecto.Modelo.EstadoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstadoProyecto  extends JpaRepository<EstadoProyecto, Long> {
    EstadoProyecto findById(int id);

}
