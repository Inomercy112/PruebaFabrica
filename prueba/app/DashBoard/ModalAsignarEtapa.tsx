import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
}

interface ModalAsignarEtapaProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    etapas: Etapa[];
    selectedProyectoId: number | null;  // 🔹 ID del proyecto seleccionado
    onEtapaAsignada: () => void; // 🔹 Callback para actualizar la lista
}

export default function ModalAsignarEtapa({
    open,
    setOpen,
    etapas,
    selectedProyectoId,
    onEtapaAsignada,
}: ModalAsignarEtapaProps) {
    const [selectedEtapa, setSelectedEtapa] = useState<number | null>(null);

    const handleAssignEtapa = async () => {
        if (!selectedProyectoId || selectedEtapa === null) {
            alert("Seleccione una etapa válida.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/etapaProyecto/Registrar/${selectedProyectoId}/${selectedEtapa}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) throw new Error(`Error al asignar etapa: ${response.status}`);

            alert("Etapa asignada correctamente");
            setOpen(false);
            onEtapaAsignada(); // 🔹 Recargar proyectos tras asignar
        } catch (error) {
            console.error("Error al asignar etapa:", error);
            alert("Hubo un error al asignar la etapa.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Asignar Etapa al Proyecto</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <label className="block text-sm font-medium dark:text-white">Seleccione una Etapa</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        value={selectedEtapa ?? ""}
                        onChange={(e) => setSelectedEtapa(Number(e.target.value))}
                    >
                        <option value="">Seleccione una etapa</option>
                        {etapas.map((etapa) => (
                            <option key={etapa.idDto} value={etapa.idDto}>
                                {etapa.nombreEtapaDto}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleAssignEtapa}>
                    Asignar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
