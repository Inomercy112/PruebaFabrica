package com.prueba.demo.Etapa.Modelo;

import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.Estado.Modelo.Estado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "etapa")
public class Etapa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "nombre_etapa")
    private String nombreEtapa;
    @Column(name = "descripcion_etapa")
    private String descripcionEtapa;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado")
    private Estado estado;


}
