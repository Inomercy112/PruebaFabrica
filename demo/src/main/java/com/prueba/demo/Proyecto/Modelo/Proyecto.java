package com.prueba.demo.Proyecto.Modelo;

import com.prueba.demo.Estado.Modelo.Estado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name ="proyecto")
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private int id;
    @Column(name = "nombre_proyecto")
    private String nombre;
    @Column(name = "descripcion_proyecto")
    private String descripcion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado")
    private Estado estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_proyecto")
    private TipoProyecto tipoProyecto;

    @Column(name = "dia_inicio")
    private String diaInicio;
    @Column(name = "dia_fin")
    private String diaFin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado_proyecto")
    private EstadoProyecto estadoProyecto;
}
