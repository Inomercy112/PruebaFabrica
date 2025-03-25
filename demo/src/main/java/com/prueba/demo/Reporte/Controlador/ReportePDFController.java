package com.prueba.demo.Reporte.Controlador;

import com.prueba.demo.Reporte.ServicioPdf.ServicioPDF;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reportes/pdf")
public class ReportePDFController {

    private final ServicioPDF servicioPDF;

    public ReportePDFController(ServicioPDF servicioPDF) {
        this.servicioPDF = servicioPDF;
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<byte[]> descargarReporte(@PathVariable int idUsuario) {
        byte[] pdf = servicioPDF.generarReportePDF(idUsuario);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=reporte_usuario_" + idUsuario + ".pdf");

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(pdf);
    }
    @GetMapping("/proyecto/{idProyecto}")
    public ResponseEntity<byte[]> descargarReporteProyecto(@PathVariable int idProyecto) {
        byte[] pdf = servicioPDF.generarReporteProyectoPDF(idProyecto);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=reporte_proyecto_" + idProyecto + ".pdf");

        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(pdf);
    }
}
