package com.prueba.demo.ActividadUsuario.Modelo;

import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuario_actividad")
public class ActividadUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_desarrollador")
    private UsuarioProyecto idDesarrollador;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_actividad")
    private Actividad idActividadEtapa;
    @Column(name = "ejecucion")
    private String ejecucion;

}
