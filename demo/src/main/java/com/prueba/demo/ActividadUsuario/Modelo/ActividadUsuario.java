package com.prueba.demo.ActividadUsuario.Modelo;

import com.prueba.demo.ActividadEtapa.ActividadEtapa;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
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
    private EtapaProyecto idDesarrollador;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_actividad")
    private ActividadEtapa idActividadEtapa;
    @Column(name = "ejecucion")
    private String ejecucion;

}
