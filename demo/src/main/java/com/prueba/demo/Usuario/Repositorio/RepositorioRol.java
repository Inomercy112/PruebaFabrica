package com.prueba.demo.Usuario.Repositorio;

import com.prueba.demo.Usuario.Modelo.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioRol extends JpaRepository<Rol, Long> {
    Rol findById(int rol);
}
