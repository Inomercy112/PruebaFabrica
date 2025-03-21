package com.prueba.demo.Error.Modelo;

import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "error_actividad")
public class ErrorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_error")
    private TipoError tipoError;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario_actividad")
    private ActividadUsuario actividadUsuario;
    @Column(name = "descripcion_error")
    private String descripcionError;
}
