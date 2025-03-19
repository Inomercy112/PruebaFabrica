import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
}

interface ModalAsignarUsuarioProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    usuarios: Usuario[];
    selectedProyectoId: number | null; // 🔹 ID del proyecto seleccionado
    onUsuarioAsignado: () => void; // 🔹 Callback para actualizar la lista
}

export default function ModalAsignarUsuario({
    open,
    setOpen,
    usuarios,
    selectedProyectoId,
    onUsuarioAsignado,
}: ModalAsignarUsuarioProps) {
    const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);

    const handleAssignWorker = async () => {
        if (!selectedProyectoId || selectedUsuario === null) {
            alert("Seleccione un usuario válido.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/usuarioProyecto/Registrar/${selectedProyectoId}/${selectedUsuario}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) throw new Error(`Error al asignar usuario: ${response.status}`);

            alert("Usuario asignado correctamente");
            setOpen(false);
            onUsuarioAsignado(); // 🔹 Recargar proyectos tras asignar
        } catch (error) {
            console.error("Error al asignar usuario:", error);
            alert("Hubo un error al asignar el usuario.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Asignar Usuario al Proyecto</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <label className="block text-sm font-medium dark:text-white">Seleccionar Usuario</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        value={selectedUsuario ?? ""}
                        onChange={(e) => setSelectedUsuario(Number(e.target.value))}
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.idDto} value={usuario.idDto}>
                                {usuario.nombreDto} {usuario.apellidoDto}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleAssignWorker}>
                    Asignar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
