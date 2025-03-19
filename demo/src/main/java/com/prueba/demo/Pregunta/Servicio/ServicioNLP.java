package com.prueba.demo.Pregunta.Servicio;

import opennlp.tools.tokenize.SimpleTokenizer;
import org.springframework.stereotype.Service;
import org.tartarus.snowball.ext.SpanishStemmer;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ServicioNLP {

    private static final Set<String> STOPWORDS = Set.of(
            "el", "la", "los", "las", "de", "del", "a", "ante", "con", "en", "por", "para",
            "un", "una", "unos", "unas", "que", "y", "o", "u", "como", "su", "sus", "es",
            "son", "ser", "fue", "fueron", "era", "eran", "ha", "han", "haber"
    );

    public double calcularSimiliutd(String pregunta1, String pregunta2){
        List<String> tokens1 = tokenizar(pregunta1);
        List<String> tokens2 = tokenizar(pregunta2);

        var set1 = new HashSet<>(tokens1);
        var set2 = new HashSet<>(tokens2);
        //cuantas palabras comparten ambas preguntas
        int interseccion = (int) set1.stream().filter(set2::contains).count();
        //devuelve un resultado de 0.0 a 1.0
        int union = set1.size() + set2.size() - interseccion;
        return (double) interseccion / union;
    }


    private List<String> tokenizar(String pregunta){
        SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE;
        SpanishStemmer stemmer = new SpanishStemmer();
        return  Arrays.stream(tokenizer.tokenize(pregunta.toLowerCase()
                        .replaceAll("[^a-zA-Z0-9áéíóúüñ ]", "")
                        .trim())).filter(token -> !STOPWORDS.contains(token))
                .map(token -> {
                    stemmer.setCurrent(token);
                    stemmer.stem();
                    return stemmer.getCurrent();
                })
                .collect(Collectors.toList());
    }
}
