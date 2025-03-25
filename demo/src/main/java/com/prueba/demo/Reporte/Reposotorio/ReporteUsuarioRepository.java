package com.prueba.demo.Reporte.Reposotorio;

import com.prueba.demo.Reporte.DTO.ReporteProyectoDTO;
import com.prueba.demo.Reporte.DTO.ReporteUsuarioDTO;
import com.prueba.demo.Usuario.Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReporteUsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query("""
    SELECT new com.prueba.demo.Reporte.DTO.ReporteUsuarioDTO(
        u.id,
        CONCAT(u.nombre, ' ', u.apellido),
        p.id,
        p.nombre,
        e.id,
        e.nombreEtapa,
        a.id,
        a.nombreActividad,
        a.descripcionActividad,
        COALESCE(ea.descripcionError, 'Sin errores'),
        COALESCE(te.nombreError, 'Sin errores'),
        COALESCE(i.fecha, 'Sin interrupciones'),
        COALESCE(i.duracion, 'Sin interrupciones'),
        COALESCE(ti.nombreTipoInterrupcion, 'Sin interrupciones')
    )
    FROM Usuario u
    JOIN UsuarioProyecto up ON u.id = up.usuario.id
    JOIN Proyecto p ON up.proyecto.id = p.id
    JOIN EtapaProyecto ep ON p.id = ep.proyecto.id
    JOIN Etapa e ON ep.etapa.id = e.id
    JOIN Actividad a ON ep.id = a.etapaProyecto.id
    JOIN ActividadUsuario ua ON a.id = ua.idActividadEtapa.id
    LEFT JOIN ErrorEntity ea ON ua.id = ea.actividadUsuario.id
    LEFT JOIN TipoError te ON ea.tipoError.id = te.id
    LEFT JOIN Interrupcion i ON ua.id = i.actividadUsuario.id
    LEFT JOIN TipoInterrupcion ti ON i.tipoInterrupcion.id = ti.id
    WHERE u.id = :idUsuario
""")
    List<ReporteUsuarioDTO> obtenerReporteUsuario(@Param("idUsuario") int idUsuario);


    @Query("""
    SELECT new com.prueba.demo.Reporte.DTO.ReporteProyectoDTO(
        p.id,
        p.nombre,
        p.descripcion,
        eps.nombreEstadoProyecto,
        ep.id,
        e.nombreEtapa,
        a.id,
        a.nombreActividad,
        a.descripcionActividad,
        CONCAT(ua.idDesarrollador.usuario.nombre, ' ', ua.idDesarrollador.usuario.apellido),
        u.id,
        CONCAT(u.nombre, ' ', u.apellido),
        r.nombreRol,
        COALESCE(ea.descripcionError, 'Sin errores'),
        COALESCE(te.nombreError, 'Sin errores'),
        COALESCE(i.fecha, 'Sin interrupciones'),
        COALESCE(i.duracion, 'Sin interrupciones'),
        COALESCE(ti.nombreTipoInterrupcion, 'Sin interrupciones')
    )
    FROM Proyecto p
    JOIN UsuarioProyecto up ON p.id = up.proyecto.id
    JOIN EstadoProyecto eps ON eps.id = p.estadoProyecto.id
    JOIN Usuario u ON up.usuario.id = u.id
    JOIN Rol r ON u.rol.id = r.id
    JOIN EtapaProyecto ep ON p.id = ep.proyecto.id
    JOIN Etapa e ON ep.etapa.id = e.id
    JOIN Actividad a ON ep.id = a.etapaProyecto.id
    LEFT JOIN ActividadUsuario ua ON a.id = ua.idActividadEtapa.id
    LEFT JOIN ErrorEntity ea ON ua.id = ea.actividadUsuario.id
    LEFT JOIN TipoError te ON ea.tipoError.id = te.id
    LEFT JOIN Interrupcion i ON ua.id = i.actividadUsuario.id
    LEFT JOIN TipoInterrupcion ti ON i.tipoInterrupcion.id = ti.id
    WHERE p.id = :idProyecto
""")
    List<ReporteProyectoDTO> obtenerReporteProyecto(@Param("idProyecto") int idProyecto);


}


