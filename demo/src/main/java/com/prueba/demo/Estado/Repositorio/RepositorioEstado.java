package com.prueba.demo.Estado.Repositorio;

import com.prueba.demo.Estado.Modelo.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstado extends JpaRepository<Estado, Long> {
    Estado findById(int id);
}
