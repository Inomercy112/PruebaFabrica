package com.prueba.demo.Interrupcion.Modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tipo_interrupcion")
public class TipoInterrupcion {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "nombre_tipo_interrupcion")
    private String nombreTipoInterrupcion;
}
