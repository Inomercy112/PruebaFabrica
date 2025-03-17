package com.prueba.demo.Usuario.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id ;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido")
    private String apellido;
    @Column(name = "correo")
    private String correo;
    @Column(name = "contrasena")
    private String contrasena;
    @Column(name = "fecha_nacimiento")
    private String fechaNacimiento;
    @Column(name = "documento")
    private int documento;
    @Column(name = "direccion")
    private String direccion;
    @Column(name = "profesion")
    private String profesion;
    @Column(name = "especialidad_desarrollo")
    private String especialidad;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rol")
    private Rol rol;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado")
    private Estado estado;
}
