package com.prueba.demo.Etapa.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtapaDTO {
    private int idDto;
    private String nombreEtapaDto;
    private String descripcionEtapaDto;
    private int estadoDto;

}
