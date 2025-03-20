package com.prueba.demo.UsuarioProyecto.Repositorio;

import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioUsuarioProyecto extends JpaRepository<UsuarioProyecto, Long> {
    UsuarioProyecto findByIdProyecto(int nombre);
    List<UsuarioProyecto> findByUsuario_Id(int idUsuario);
}
