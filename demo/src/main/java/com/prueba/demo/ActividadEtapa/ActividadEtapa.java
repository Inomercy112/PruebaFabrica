package com.prueba.demo.ActividadEtapa;

import com.prueba.demo.Actividad.Modelo.Actividad;
import com.prueba.demo.EtapaProyecto.Modelo.EtapaProyecto;
import com.prueba.demo.UsuarioProyecto.Modelo.UsuarioProyecto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "etapa_actividad")
public class ActividadEtapa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "id_etapa")
    private EtapaProyecto idDesarrollador;
    @ManyToOne
    @JoinColumn(name = "id_actividad")
    private Actividad idActividad;
}
