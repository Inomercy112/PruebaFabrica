package com.prueba.demo.Proyecto.Repositorio;

import com.prueba.demo.Proyecto.Modelo.Proyecto;
import com.prueba.demo.Usuario.Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioProyecto extends JpaRepository<Proyecto, Integer> {

}
