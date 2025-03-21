package com.prueba.demo.UsuarioProyecto.Repositorio;

import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioUsuarioProyecto extends JpaRepository<UsuarioProyecto, Integer> {
    UsuarioProyecto findByProyecto_IdAndUsuario_Id(int idProyecto, int idDesarrollador);

    List<UsuarioProyecto> findByProyecto_id(int proyectoId);

}
