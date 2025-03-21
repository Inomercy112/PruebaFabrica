import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
    rolDto: {
        idDto: number;
        nombreRol: string;
    };
}

interface ModalAsignarUsuarioProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    usuarios: Usuario[];
    selectedProyectoId: number | null;
    onUsuarioAsignado: () => void;
}

export default function ModalAsignarUsuario({
    open,
    setOpen,
    usuarios,
    selectedProyectoId,
    onUsuarioAsignado,
}: ModalAsignarUsuarioProps) {
    const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);

    // Filtrar solo los usuarios con rol 2 o 3
    const usuariosFiltrados = usuarios.filter(user => user.rolDto.idDto === 2 || user.rolDto.idDto === 3);

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
            onUsuarioAsignado();
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Seleccionar Usuario
                    </label>
                    <div className="relative">
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 appearance-none"
                            value={selectedUsuario ?? ""}
                            title="usuario"
                            onChange={(e) => setSelectedUsuario(Number(e.target.value))}
                        >
                            <option value="" disabled>Seleccione un usuario</option>
                            {usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map((usuario) => (
                                    <option key={usuario.idDto} value={usuario.idDto}>
                                        {usuario.nombreDto} {usuario.apellidoDto} - {usuario.rolDto.nombreRol}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No hay usuarios disponibles</option>
                            )}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            ⏷
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleAssignWorker} disabled={!selectedUsuario}>
                    Asignar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
