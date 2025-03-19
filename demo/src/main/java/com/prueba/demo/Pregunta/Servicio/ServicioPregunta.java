package com.prueba.demo.Pregunta.Servicio;

import com.prueba.demo.Pregunta.DTO.PreguntaDTO;
import com.prueba.demo.Pregunta.Modelo.Pregunta;
import com.prueba.demo.Pregunta.Repositorio.RepositorioPregunta;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioPregunta {

    private final RepositorioPregunta repositorioPregunta;
    private final ServicioNLP servicioNLP;

    public ServicioPregunta(RepositorioPregunta repositorioPregunta, ServicioNLP servicioNLP) {
        this.repositorioPregunta = repositorioPregunta;
        this.servicioNLP = servicioNLP;
    }

    public void registrarPregunta(PreguntaDTO preguntaDTO) {
        List<Pregunta> todasPreguntas = repositorioPregunta.findAll();
        for (Pregunta pregunta : todasPreguntas) {
            double similitud = servicioNLP.calcularSimiliutd(preguntaDTO.getPreguntaDto(), pregunta.getPregunta());
            if (similitud >= 0.50){
                pregunta.setConteo(pregunta.getConteo() + 1);
                repositorioPregunta.save(pregunta);
                return;
            }
        }
        Pregunta pregunta = new Pregunta();
        preguntaDTOToEntity(pregunta,preguntaDTO);
        pregunta.setConteo(1);
        repositorioPregunta.save(pregunta);
    }

    public List <PreguntaDTO> obtenerPreguntas() {
        return repositorioPregunta.findAll().stream().map(this::preguntaEntityToDTO).toList();
    }


    private void preguntaDTOToEntity(Pregunta pregunta,PreguntaDTO preguntaDTO) {

        pregunta.setPregunta(preguntaDTO.getPreguntaDto());
        pregunta.setConteo(preguntaDTO.getConteoDto());

    }
    private PreguntaDTO preguntaEntityToDTO(Pregunta pregunta) {
        PreguntaDTO preguntaDTO = new PreguntaDTO();
        preguntaDTO.setIdDto(pregunta.getId());
        preguntaDTO.setPreguntaDto(pregunta.getPregunta());
        preguntaDTO.setConteoDto(pregunta.getConteo());
        return preguntaDTO;
    }
}
