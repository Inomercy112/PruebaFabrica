package com.prueba.demo.Pregunta.Modelo;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "pregunta")
public class Pregunta {
    @Id
    private String id;
    private String pregunta;
    private int conteo;
}
