package com.prueba.demo.Usuario.Repositorio;

import com.prueba.demo.Usuario.Modelo.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstado extends JpaRepository<Estado, Long> {
    Estado findById(int id);
}
