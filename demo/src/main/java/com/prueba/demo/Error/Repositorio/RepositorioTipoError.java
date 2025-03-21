package com.prueba.demo.Error.Repositorio;

import com.prueba.demo.Error.Modelo.TipoError;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioTipoError extends JpaRepository<TipoError, Integer> {
}
