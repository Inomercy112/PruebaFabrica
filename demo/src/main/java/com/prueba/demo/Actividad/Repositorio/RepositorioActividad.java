package com.prueba.demo.Actividad.Repositorio;

import com.prueba.demo.Actividad.Modelo.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioActividad extends JpaRepository<Actividad, Integer> {
}
