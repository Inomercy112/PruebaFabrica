package com.prueba.demo.Interrupcion.DTO;

import com.prueba.demo.ActividadUsuario.DTO.ActividadUsuarioDTO;
import com.prueba.demo.ActividadUsuario.Modelo.ActividadUsuario;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InterrupcionDTO {
    private int idDto;
    private ActividadUsuarioDTO actividadUsuarioDTO;
    private String fechaDto;
    private String duracionDto;
    private TipoInterrupcionDTO tipoInterrupcionDTO;
    @Data

    public static class TipoInterrupcionDTO {
        private int idDto;
        private String nombreTipoInterrupcionDto;

    }
}
