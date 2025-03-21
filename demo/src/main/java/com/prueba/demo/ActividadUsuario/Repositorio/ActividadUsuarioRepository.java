package com.prueba.demo.ActividadUsuario.Repositorio;


import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActividadUsuarioRepository extends JpaRepository<ActividadUsuario, Integer> {

    List<ActividadUsuario> findByIdDesarrollador_Usuario_Id(int id);
    List<ActividadUsuario> findByIdDesarrollador_Proyecto_Id(int id);



}