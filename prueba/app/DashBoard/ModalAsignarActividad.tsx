
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
}

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
}

interface ModalAsignarActividadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    etapas: Etapa[];
    selectedProyectoId: number | null;
    onActividadAsignada: () => void;
}

export default function ModalAsignarActividad({
    open,
    setOpen,
    etapas,
    selectedProyectoId,
    onActividadAsignada,
}: ModalAsignarActividadProps) {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [selectedEtapa, setSelectedEtapa] = useState<number | null>(null);
    const [selectedActividad, setSelectedActividad] = useState<number | null>(null);
    useEffect(() => {
        if (open) {
            cargarActividades();
        }
    }, [open]);

    const cargarActividades = async () => {
        try {
            const response = await fetch("http://localhost:8080/actividad/Consultar");
            const data = await response.json();
            setActividades(data);
        } catch (error) {
            console.error("Error al cargar actividades:", error);
        }
    };

    const handleAssignActividad = async () => {
        if (!selectedProyectoId || selectedEtapa === null || selectedActividad === null) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const actividadEtapaDTO = {
            idDesarrolladorDto: {
                idDto: selectedEtapa,
                proyectoDto: selectedProyectoId,
            },
            idActividadDto: {
                idDto: selectedActividad,
            },
        };

        try {
            const response = await fetch("http://localhost:8080/actividadEtapa/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actividadEtapaDTO),
            });

            if (!response.ok) throw new Error(`Error al asignar actividad: ${response.status}`);

            alert("Actividad asignada correctamente");
            setOpen(false);
            onActividadAsignada();
        } catch (error) {
            console.error("Error al asignar actividad:", error);
            alert("Hubo un error al asignar la actividad.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Asignar Actividad a una Etapa</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <label className="block text-sm font-medium dark:text-white">Seleccione una Etapa</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        value={selectedEtapa ?? ""}
                        title="etapa"
                        onChange={(e) => setSelectedEtapa(Number(e.target.value))}
                    >
                        <option value="">Seleccione una etapa</option>
                        {etapas.map((etapa) => (
                            <option key={etapa.idDto} value={etapa.idDto}>
                                {etapa.nombreEtapaDto}
                            </option>
                        ))}
                    </select>


                    <label className="block text-sm font-medium dark:text-white">Seleccione una Actividad</label>
                    <select
                        title="actividad"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        value={selectedActividad ?? ""}
                        onChange={(e) => setSelectedActividad(Number(e.target.value))}
                    >
                        <option value="">Seleccione una actividad</option>
                        {actividades.map((actividad) => (
                            <option key={actividad.idDto} value={actividad.idDto}>
                                {actividad.nombreActividadDto}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleAssignActividad}>
                    Asignar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
