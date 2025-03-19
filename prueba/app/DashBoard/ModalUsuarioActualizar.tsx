

import { Button, Modal } from "flowbite-react";

import { useState } from "react";

interface UsuarioFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    usuario: {
        idDto: number;
        nombreDto: string;
        apellidoDto: string;
        correoDto: string;
        fechaNacimientoDto: string;
        documentoDto: number;
        direccionDto: string;
        profesionDto: string;
        especialidadDto: string;
        estadoDto: number;
        rolDto: { idDto: number; nombreRol: string };
    };
}

export function ModalActualizarUsuario({ open, setOpen, usuario }: UsuarioFormProps) {
    const [formData, setFormData] = useState({ ...usuario });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "rolDto.idDto") {
            setFormData((prev) => ({
                ...prev,
                rolDto: { ...prev.rolDto, idDto: parseInt(value) },
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "documentoDto" || name === "estadoDto" ? parseInt(value) : value,
            }));
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/usuario/Actualizar/${usuario.idDto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error al actualizar usuario: ${response.status}`);

            alert("Usuario actualizado correctamente");
            setOpen(false);
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar usuario");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Actualizar Usuario</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-white">Nombre</label>
                        <input
                            type="text"
                            name="nombreDto"
                            value={formData.nombreDto}
                            onChange={handleChange}
                            placeholder="nombre"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Apellido</label>
                        <input
                            type="text"
                            name="apellidoDto"
                            value={formData.apellidoDto}
                            onChange={handleChange}
                            placeholder="apellido"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Correo Electrónico</label>
                        <input
                            type="email"
                            name="correoDto"
                            value={formData.correoDto}
                            onChange={handleChange}
                            placeholder="correo"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-white">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="fechaNacimientoDto"
                            value={formData.fechaNacimientoDto}
                            onChange={handleChange}
                            placeholder="fecha nacimiento"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Número de Documento</label>
                        <input
                            type="number"
                            name="documentoDto"
                            value={formData.documentoDto}
                            onChange={handleChange}
                            placeholder="documento"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Dirección</label>
                        <input
                            type="text"
                            name="direccionDto"
                            value={formData.direccionDto}
                            onChange={handleChange}
                            placeholder="direccion"

                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Profesión</label>
                        <input
                            type="text"
                            name="profesionDto"
                            value={formData.profesionDto}
                            onChange={handleChange}
                            placeholder="profesion"

                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Especialidad</label>
                        <input
                            type="text"
                            name="especialidadDto"
                            value={formData.especialidadDto}
                            onChange={handleChange}
                            placeholder="especialidad"

                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleUpdate} color="success">
                    Guardar cambios
                </Button>
                <Button onClick={() => setOpen(false)} color="gray">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


