package com.prueba.demo.UsuarioProyecto.Repositorio;

import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioUsuarioProyecto extends JpaRepository<UsuarioProyecto, Long> {
}
