package com.prueba.demo.Proyecto.Repositorio;

import com.prueba.demo.Proyecto.Modelo.TipoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioTipoProyecto extends JpaRepository<TipoProyecto, Integer> {
}
