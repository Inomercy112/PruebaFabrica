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
    selectedProyectoId: number | null;
    onEtapaAsignada: () => void;
}

export default function ModalAsignarEtapa({
    open,
    setOpen,
    etapas,
    selectedProyectoId,
    onEtapaAsignada,
}: ModalAsignarEtapaProps) {
    const [selectedEtapa, setSelectedEtapa] = useState<number | null>(null);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");

    const handleAssignEtapa = async () => {
        if (!selectedProyectoId || selectedEtapa === null || !fechaInicio || !fechaFin) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const etapaProyectoDTO = {
            proyectoDto: selectedProyectoId,
            nombreProyectoDto: "", 
            etapaDto: { idDto: selectedEtapa },
            fechaInicio,
            fechaFin,
            actividadDto: [],
        };

        try {
            const response = await fetch("http://localhost:8080/etapaProyecto/Registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(etapaProyectoDTO),
            });

            if (!response.ok) throw new Error(`Error al asignar etapa: ${response.status}`);

            alert("Etapa asignada correctamente");
            setOpen(false);
            onEtapaAsignada();
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
                         className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Fecha de Inicio</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Fecha de Fin</label>
                        <input
                            type="date"
                             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            required
                        />
                    </div>
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