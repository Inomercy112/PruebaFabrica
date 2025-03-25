package com.prueba.demo.Error.Repositorio;

import com.prueba.demo.Error.Modelo.ErrorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioError extends JpaRepository<ErrorEntity, Long> {

}
