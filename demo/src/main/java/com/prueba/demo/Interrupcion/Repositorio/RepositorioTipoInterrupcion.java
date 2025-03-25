package com.prueba.demo.Interrupcion.Repositorio;

import com.prueba.demo.Interrupcion.Modelo.TipoInterrupcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioTipoInterrupcion extends JpaRepository<TipoInterrupcion, Integer> {
}
