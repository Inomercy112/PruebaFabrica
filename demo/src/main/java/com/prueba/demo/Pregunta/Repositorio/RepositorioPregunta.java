package com.prueba.demo.Pregunta.Repositorio;

import com.prueba.demo.Pregunta.Modelo.Pregunta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioPregunta extends MongoRepository<Pregunta, Integer> {

}
