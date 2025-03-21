import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";

interface TipoError {
    idDto: number;
    nombreError: string;
}

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
}

interface ModalRegistroErrorProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    actividad: Actividad | null;
    onErrorRegistrado: () => void;
}

export default function ModalRegistroError({
    open,
    setOpen,
    actividad,
    onErrorRegistrado,
}: ModalRegistroErrorProps) {
    const [tiposError, setTiposError] = useState<TipoError[]>([]);
    const [filteredTiposError, setFilteredTiposError] = useState<TipoError[]>([]);
    const [selectedTipoError, setSelectedTipoError] = useState<number | null>(null);
    const [descripcionError, setDescripcionError] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        if (open) {
            fetch("http://localhost:8080/error/Consultar/TipoError")
                .then((res) => res.json())
                .then((data) => {
                    setTiposError(data);
                    setFilteredTiposError(data);
                })
                .catch((error) => console.error("Error al obtener tipos de error:", error));

            if (actividad) {
                setDescripcionError(`Error en actividad: ${actividad.nombreActividadDto}`);
            }
        }
    }, [open, actividad]);

    useEffect(() => {
        const filtered = tiposError.filter((error) =>
            error.nombreError.toLowerCase().includes(searchError.toLowerCase())
        );
        setFilteredTiposError(filtered);
    }, [searchError, tiposError]);

    const handleSubmit = async () => {
        if (!actividad || !selectedTipoError || !descripcionError.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const errorDTO = {
            descripcionErrorDto: descripcionError,
            actividadUsuarioDTO: {
                idActividadEtapaDto: [{ idDto: actividad.idDto }],
            },
            tipoErrorDTO: { idDto: selectedTipoError },
        };

        try {
            const response = await fetch("http://localhost:8080/error/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(errorDTO),
            });

            if (!response.ok) throw new Error(`Error al registrar error: ${response.status}`);

            alert("Error registrado correctamente.");
            setOpen(false);
            onErrorRegistrado();
            limpiarFormulario();
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Hubo un problema al registrar el error.");
        }
    };

    const limpiarFormulario = () => {
        setDescripcionError("");
        setSelectedTipoError(null);
        setSearchError("");
    };

    return (
        <Modal show={open} onClose={() => { setOpen(false); limpiarFormulario(); }}>
            <Modal.Header>Registrar Error en Actividad</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Actividad:</strong> {actividad?.nombreActividadDto || "Seleccione una actividad"}
                    </p>

                    <label className="block text-sm font-medium dark:text-white">Buscar Tipo de Error</label>
                    <input
                        type="text"
                        placeholder="Escriba para filtrar..."
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        value={searchError}
                        onChange={(e) => setSearchError(e.target.value)}
                    />

                    <label className="block text-sm font-medium dark:text-white">Tipo de Error</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        value={selectedTipoError ?? ""}
                        onChange={(e) => setSelectedTipoError(Number(e.target.value))}
                    >
                        <option value="">Seleccione un tipo de error</option>
                        {filteredTiposError.map((error) => (
                            <option key={error.idDto} value={error.idDto}>
                                {error.nombreError}
                            </option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium dark:text-white">Descripción</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        rows={3}
                        placeholder="Describa el error..."
                        value={descripcionError}
                        onChange={(e) => setDescripcionError(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleSubmit}>Registrar Error</Button>
                <Button color="gray" onClick={() => { setOpen(false); limpiarFormulario(); }}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}
