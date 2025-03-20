package com.prueba.demo.Actividad.Modelo;

import com.prueba.demo.Estado.Modelo.Estado;
import com.prueba.demo.Etapa.Modelo.Etapa;
import jakarta.persistence.*;
import lombok.*;

@Entity

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "nombre_actividad")
    private String nombreActividad;
    @Column(name = "descripcion_actividad")
    private String descripcionActividad;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado")
    private Estado estado;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_etapa")
    private Etapa etapa;

}
