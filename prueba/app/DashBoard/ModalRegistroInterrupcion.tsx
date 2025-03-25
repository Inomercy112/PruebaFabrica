import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface TipoInterrupcion {
    idDto: number;
    nombreTipoInterrupcionDto: string;
}

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
}


interface ModalRegistroInterrupcionProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    actividad: Actividad | null;
    onInterrupcionRegistrada: () => void;
}

export default function ModalRegistroInterrupcion({
    open,
    setOpen,
    actividad,
    onInterrupcionRegistrada,
}: ModalRegistroInterrupcionProps) {
    const [tiposInterrupcion, setTiposInterrupcion] = useState<TipoInterrupcion[]>([]);
    const [selectedTipoInterrupcion, setSelectedTipoInterrupcion] = useState<number | null>(null);
    const [duracion, setDuracion] = useState("");

    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (open) {
            // Obtener tipos de interrupción
            fetch("http://localhost:8080/interrupcion/Consultar/Tipo")
                .then((res) => res.json())
                .then((data) => {
                    setTiposInterrupcion(data);
                })
                .catch((error) => console.error("Error al obtener tipos de interrupción:", error));
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!actividad || !selectedTipoInterrupcion || !duracion.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const interrupcionDTO = {
            actividadUsuarioDTO: {
                idDto: actividad.idDto,
            },
            fechaDto: fechaActual,
            duracionDto: duracion,
            tipoInterrupcionDTO: { idDto: selectedTipoInterrupcion },
        };

        try {
            const response = await fetch("http://localhost:8080/interrupcion/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interrupcionDTO),
            });

            if (!response.ok) throw new Error(`Error al registrar interrupción: ${response.status}`);

            alert("Interrupción registrada correctamente.");
            setOpen(false);
            onInterrupcionRegistrada();
            limpiarFormulario();
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Hubo un problema al registrar la interrupción.");
        }
    };

    const limpiarFormulario = () => {
        setSelectedTipoInterrupcion(null);
        setDuracion("");
    };

    return (
        <Modal show={open} onClose={() => { setOpen(false); limpiarFormulario(); }}>
            <Modal.Header>Registrar Interrupción</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Fecha:</strong> {fechaActual}
                    </p>

                    {/* Tipo de Interrupción */}
                    <label className="block text-sm font-medium dark:text-white">Tipo de Interrupción</label>
                    <select
                        title="interrupcion"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        value={selectedTipoInterrupcion ?? ""}
                        onChange={(e) => setSelectedTipoInterrupcion(Number(e.target.value))}
                    >
                        <option value="">Seleccione un tipo de interrupción</option>
                        {tiposInterrupcion.map((interrupcion) => (
                            <option key={interrupcion.idDto} value={interrupcion.idDto}>
                                {interrupcion.nombreTipoInterrupcionDto}
                            </option>
                        ))}
                    </select>

                    {/* Duración */}
                    <label className="block text-sm font-medium dark:text-white">Duración</label>
                    <input
                        type="text"
                        placeholder="Ejemplo: 2 horas, 30 minutos"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleSubmit}>Registrar Interrupción</Button>
                <Button color="gray" onClick={() => { setOpen(false); limpiarFormulario(); }}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}
