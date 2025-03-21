package com.prueba.demo.Error.DTO;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDTO {
    private int idDto;
    private String descripcionErrorDto;
    private ActividadUsuarioDTO actividadUsuarioDTO;
    private TipoErrorDTO tipoErrorDTO;
    @Data
    public static class TipoErrorDTO {
        private int idDto;
        private String nombreError;
    }
}
