package com.prueba.demo.Etapa.Repositorio;

import com.prueba.demo.Etapa.Modelo.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositorioEtapa extends JpaRepository<Etapa, Long> {
    Optional<Etapa> findById(int id);
}
