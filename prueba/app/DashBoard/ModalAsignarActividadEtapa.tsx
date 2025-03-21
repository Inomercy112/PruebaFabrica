import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
}

interface ModalAsignarActividadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    etapas: Etapa[];
    selectedProyectoId: number | null;
    etapaProyectoDTO: { idDto: string };
    onActividadAsignada: () => void;
}

export default function ModalAsignarActividad({
    open,
    setOpen,
    etapas,
    selectedProyectoId,
    onActividadAsignada,
}: ModalAsignarActividadProps) {
    const [selectedEtapa, setSelectedEtapa] = useState<number | null>(null);
    console.log(etapas);
    const idRelacion = etapas.length > 0 ? etapas[0].idDto : null;
    console.log(idRelacion);
    
    console.log(idRelacion);
    const [formData, setFormData] = useState({
        nombreActividadDto: "",
        descripcionActividadDto: "",
        estadoActividadDto: "1", 
        etapaProyectoDTO: {
            idDto: idRelacion,
            etapaDto: {
                idDto: ""
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAssignActividad = async () => {
        if (!selectedProyectoId || selectedEtapa === null || !formData.nombreActividadDto || !formData.descripcionActividadDto) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const actividadDTO = {
            nombreActividadDto: formData.nombreActividadDto,
            descripcionActividadDto: formData.descripcionActividadDto,
            estadoActividadDto: formData.estadoActividadDto,
            etapaProyectoDTO: {
                idDto: idRelacion,
                etapaDto: {
                    idDto: selectedEtapa
                }
            }
        };

        try {
            console.log(actividadDTO)
            const response = await fetch("http://localhost:8080/actividad/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actividadDTO),
            });

            if (!response.ok) throw new Error(`Error al asignar actividad: ${response.status}`);

            alert("Actividad asignada correctamente");
            setOpen(false);
            onActividadAsignada();
            setFormData({ 
                nombreActividadDto: "", 
                descripcionActividadDto: "", 
                estadoActividadDto: "1", 
                etapaProyectoDTO: {
                    idDto: idRelacion,
                    etapaDto: {
                        idDto: ""
                    }
                }
            });
        } catch (error) {
            console.error("Error al asignar actividad:", error);
            alert("Hubo un error al asignar la actividad.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Asignar Nueva Actividad a una Etapa</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <label className="block text-sm font-medium dark:text-white">Seleccione una Etapa</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        value={selectedEtapa ?? ""}
                        onChange={(e) => setSelectedEtapa(Number(e.target.value))}
                    >
                        <option value="">Seleccione una etapa</option>
                        {etapas.map((etapa) => (
                            <option key={etapa.etapaDto.idDto} value={etapa.etapaDto.idDto}>
                                {etapa.etapaDto.nombreEtapaDto}
                            </option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium dark:text-white">Nombre de la Actividad</label>
                    <input
                        type="text"
                        name="nombreActividadDto"
                        value={formData.nombreActividadDto}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese el nombre de la actividad"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />

                    <label className="block text-sm font-medium dark:text-white">Descripción de la Actividad</label>
                    <textarea
                        name="descripcionActividadDto"
                        value={formData.descripcionActividadDto}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Ingrese una descripción"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleAssignActividad}>
                    Asignar Actividad
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
} 
