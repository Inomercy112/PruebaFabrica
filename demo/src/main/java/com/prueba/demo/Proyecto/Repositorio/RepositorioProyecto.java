package com.prueba.demo.Proyecto.Repositorio;

import com.prueba.demo.Proyecto.Modelo.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioProyecto extends JpaRepository<Proyecto, Integer> {

}
