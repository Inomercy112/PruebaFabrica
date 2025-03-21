package com.prueba.demo.Interrupcion.Repositorio;

import com.prueba.demo.Interrupcion.Modelo.Interrupcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioInterrupcion extends JpaRepository<Interrupcion, Long> {
}
