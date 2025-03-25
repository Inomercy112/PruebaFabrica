package com.prueba.demo.UsuarioProyecto.Repositorio;

import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioUsuarioProyecto extends JpaRepository<UsuarioProyecto, Integer> {
    Optional <UsuarioProyecto> findByProyecto_IdAndUsuario_Id(int idProyecto, int idDesarrollador);

    List<UsuarioProyecto> findByProyecto_id(int proyectoId);

}
