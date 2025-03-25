package com.prueba.demo.Interrupcion.Modelo;

import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "interrupcion")
public class Interrupcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_interrupcion")
    private TipoInterrupcion tipoInterrupcion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario_actividad")
    private ActividadUsuario actividadUsuario;
    @Column(name = "fecha")
    private String fecha;
    @Column(name = "duracion")
    private String duracion;

}
