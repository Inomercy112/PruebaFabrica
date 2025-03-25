package com.prueba.demo.Reporte.ServicioPdf;


import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceGray;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.prueba.demo.Reporte.DTO.ReporteProyectoDTO;
import com.prueba.demo.Reporte.DTO.ReporteUsuarioDTO;
import com.prueba.demo.Reporte.Reposotorio.ReporteUsuarioRepository;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ServicioPDF {

    private final ReporteUsuarioRepository reporteUsuarioRepository;
    private static final String LOGO_PATH = "src/main/resources/static/logo.png";

    public ServicioPDF(ReporteUsuarioRepository reporteUsuarioRepository) {
        this.reporteUsuarioRepository = reporteUsuarioRepository;
    }

    public byte[] generarReportePDF(int idUsuario) {
        List<ReporteUsuarioDTO> reportes = reporteUsuarioRepository.obtenerReporteUsuario(idUsuario);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        try {
            ImageData imageData = ImageDataFactory.create(LOGO_PATH);
            Image logo = new Image(imageData);
            logo.setWidth(60);
            document.add(logo);
        } catch (Exception e) {
            System.out.println("⚠ No se encontró el logo en la ruta: " + LOGO_PATH);
        }

        Paragraph title = new Paragraph("Reporte de Actividades del Trabajador")
                .setTextAlignment(TextAlignment.CENTER)
                .setFontSize(20)
                .setFontColor(ColorConstants.BLUE)
                .setMarginBottom(20);
        document.add(title);

        if (reportes.isEmpty()) {
            document.add(new Paragraph("\nNo se encontraron registros para este usuario.")
                    .setFontSize(14)
                    .setFontColor(ColorConstants.RED));
        } else {
            ReporteUsuarioDTO usuario = reportes.get(0);
            document.add(new Paragraph("Usuario: " + usuario.getNombreCompleto())
                    .setFontSize(14)
                    .setMarginBottom(10));

            Table table = new Table(new float[]{3, 3, 3, 4, 3, 3, 3});
            table.setWidth(UnitValue.createPercentValue(100));

            String[] headers = {"Proyecto", "Etapa", "Actividad", "Descripción", "Errores", "Interrupciones", "Duración"};
            for (String header : headers) {
                Cell headerCell = new Cell().add(new Paragraph(header).setFontColor(ColorConstants.WHITE));
                headerCell.setBackgroundColor(ColorConstants.DARK_GRAY);
                headerCell.setTextAlignment(TextAlignment.CENTER);
                headerCell.setPadding(5);
                table.addHeaderCell(headerCell);
            }

            boolean alternateColor = false;
            for (ReporteUsuarioDTO r : reportes) {
                DeviceGray rowColor = alternateColor ? new DeviceGray(0.9f) : DeviceGray.WHITE;
                alternateColor = !alternateColor;

                table.addCell(estilizarCelda(r.getNombreProyecto(), rowColor));
                table.addCell(estilizarCelda(r.getNombreEtapa(), rowColor));
                table.addCell(estilizarCelda(r.getNombreActividad(), rowColor));
                table.addCell(estilizarCelda(r.getDescripcionActividad(), rowColor));
                table.addCell(estilizarCelda(r.getNombreError(), rowColor));
                table.addCell(estilizarCelda(r.getTipoInterrupcion(), rowColor));
                table.addCell(estilizarCelda(r.getDuracionInterrupcion(), rowColor));
            }

            document.add(table);
        }

        document.close();
        return baos.toByteArray();
    }

    private Cell estilizarCelda(String contenido, DeviceGray bgColor) {
        Cell cell = new Cell().add(new Paragraph(contenido == null ? "N/A" : contenido));
        cell.setBackgroundColor(bgColor);
        cell.setPadding(5);
        cell.setTextAlignment(TextAlignment.CENTER);
        return cell;
    }


    public byte[] generarReporteProyectoPDF(int idProyecto) {
        List<ReporteProyectoDTO> reportes = reporteUsuarioRepository.obtenerReporteProyecto(idProyecto);

        if (reportes.isEmpty()) {
            return generarPDFSinDatos();
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        ReporteProyectoDTO proyecto = reportes.get(0);

        document.add(new Paragraph("Reporte del Proyecto: " + proyecto.getNombreProyecto())
                .setFontSize(18)

                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph("\nDescripción: " + proyecto.getDescripcionProyecto())
                .setFontSize(14));

        document.add(new Paragraph("Estado del Proyecto: " + proyecto.getEstadoProyecto())
                .setFontSize(14)
                .setFontColor(ColorConstants.BLUE));

        Set<String> trabajadores = reportes.stream()
                .map(r -> r.getNombreUsuario() + " (" + r.getRolUsuario() + ")")
                .filter(nombre -> !nombre.trim().isEmpty())
                .collect(Collectors.toSet());

        document.add(new Paragraph("\nTrabajadores del Proyecto:")
                .setFontSize(14));

        if (trabajadores.isEmpty()) {
            document.add(new Paragraph("No hay trabajadores asignados al proyecto.")
                    .setFontSize(12)
                    .setFontColor(ColorConstants.RED));
        } else {
            for (String trabajador : trabajadores) {
                document.add(new Paragraph("- " + trabajador).setFontSize(12));
            }
        }

        Map<Integer, List<ReporteProyectoDTO>> etapas = reportes.stream()
                .collect(Collectors.groupingBy(ReporteProyectoDTO::getIdEtapa));

        if (etapas.isEmpty()) {
            document.add(new Paragraph("\nEl proyecto no tiene etapas definidas.")
                    .setFontSize(12)
                    .setFontColor(ColorConstants.RED));
        }

        for (Map.Entry<Integer, List<ReporteProyectoDTO>> entry : etapas.entrySet()) {
            List<ReporteProyectoDTO> actividades = entry.getValue();
            ReporteProyectoDTO etapa = actividades.get(0);

            document.add(new Paragraph("\nEtapa: " + etapa.getNombreEtapa())
                    .setFontSize(14)
                    .setFontColor(ColorConstants.DARK_GRAY));

            if (actividades.isEmpty()) {
                document.add(new Paragraph("  Etapa sin actividades.")
                        .setFontSize(12)
                        .setFontColor(ColorConstants.RED));
                continue;
            }

            long totalErrores = actividades.stream().filter(r -> !r.getNombreError().equals("Sin errores")).count();
            long totalInterrupciones = actividades.stream().filter(r -> !r.getTipoInterrupcion().equals("Sin interrupciones")).count();

            document.add(new Paragraph("Errores en la etapa: " + totalErrores + " | Interrupciones: " + totalInterrupciones)
                    .setFontSize(12));
            Map<Integer, List<ReporteProyectoDTO>> actividadesPorEtapa = actividades.stream()
                    .collect(Collectors.groupingBy(ReporteProyectoDTO::getIdActividad));

            for (Map.Entry<Integer, List<ReporteProyectoDTO>> actEntry : actividadesPorEtapa.entrySet()) {
                List<ReporteProyectoDTO> detallesActividad = actEntry.getValue();
                ReporteProyectoDTO actividad = detallesActividad.get(0);

                document.add(new Paragraph("\n  • Actividad: " + actividad.getNombreActividad())
                        .setFontSize(12)
                        .setFontColor(ColorConstants.BLUE));

                document.add(new Paragraph("    Descripción: " + actividad.getDescripcionActividad())
                        .setFontSize(11));

                String encargado = actividad.getNombreEncargadoActividad();
                if (encargado == null || encargado.trim().isEmpty()) {
                    document.add(new Paragraph("    Encargado: No tiene trabajador asociado")
                            .setFontSize(11)
                            .setFontColor(ColorConstants.RED));
                } else {
                    document.add(new Paragraph("    Encargado: " + encargado)
                            .setFontSize(11));
                }

                List<String> errores = detallesActividad.stream()
                        .map(ReporteProyectoDTO::getNombreError)
                        .filter(err -> !err.equals("Sin errores"))
                        .distinct()
                        .collect(Collectors.toList());

                if (!errores.isEmpty()) {
                    document.add(new Paragraph("    Errores: " + String.join(", ", errores))
                            .setFontSize(11)
                            .setFontColor(ColorConstants.RED));
                }

                List<String> interrupciones = detallesActividad.stream()
                        .map(ReporteProyectoDTO::getTipoInterrupcion)
                        .filter(inter -> !inter.equals("Sin interrupciones"))
                        .distinct()
                        .collect(Collectors.toList());

                if (!interrupciones.isEmpty()) {
                    document.add(new Paragraph("    Interrupciones: " + String.join(", ", interrupciones))
                            .setFontSize(11)
                            .setFontColor(ColorConstants.ORANGE));
                }
            }
        }

        document.close();
        return baos.toByteArray();
    }

    private byte[] generarPDFSinDatos() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("No se encontraron datos para el proyecto seleccionado.")
                .setFontSize(14)
                .setFontColor(ColorConstants.RED)
                .setTextAlignment(TextAlignment.CENTER));

        document.close();
        return baos.toByteArray();
    }


    }
