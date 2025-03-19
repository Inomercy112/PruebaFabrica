package com.prueba.demo.EtapaProyecto.Modelo;

import com.prueba.demo.Etapa.Modelo.Etapa;
import com.prueba.demo.Proyecto.Modelo.Proyecto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "etapa_proyecto")
public class EtapaProyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_proyecto")
    private Proyecto proyecto;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_etapa")
    private Etapa etapa;
    @Column(name = "fecha_inicio")
    private String fechaInicio;
    @Column(name = "fecha_fin")
    private String fechaFin;
}
