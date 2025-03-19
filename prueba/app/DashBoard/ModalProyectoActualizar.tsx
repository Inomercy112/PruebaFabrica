import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface Proyecto {
    idDto: number;
    nombreDto: string;
    descripcionDto: string;
    estadoDto: number;
    estadoProyectoDto: {
        idDto: number;
        nombreEstadoDto: string;
    };
    diaInicioDto: string;
    diaFinDto: string;
}

interface ModalActualizarProyectoProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    proyecto: Proyecto;
    onProyectoActualizado: () => void;
}

export default function ModalActualizarProyecto({
    open,
    setOpen,
    proyecto,
    onProyectoActualizado,
}: ModalActualizarProyectoProps) {
    const [formData, setFormData] = useState<Proyecto | null>(null);

    useEffect(() => {
        if (proyecto) {
            setFormData({ ...proyecto });
        }
    }, [proyecto, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleUpdateProyecto = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            const response = await fetch(`http://localhost:8080/proyecto/Actualizar/${formData.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // 🔹 Enviar TODO el objeto actualizado
            });

            if (!response.ok) throw new Error(`Error al actualizar el proyecto: ${response.status}`);

            alert("Proyecto actualizado correctamente");
            setOpen(false);
            onProyectoActualizado();
        } catch (error) {
            console.error("Error al actualizar proyecto:", error);
            alert("Hubo un error al actualizar el proyecto.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Actualizar Proyecto</Modal.Header>
            <Modal.Body>
                {formData && (
                    <form className="space-y-4" onSubmit={handleUpdateProyecto}>
                        <div>
                            <label className="block text-sm font-medium dark:text-white">Nombre</label>
                            <input
                                type="text"
                                name="nombreDto"
                                value={formData.nombreDto}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-white">Descripción</label>
                            <textarea
                                name="descripcionDto"
                                value={formData.descripcionDto}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Guardar Cambios
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                )}
            </Modal.Body>
        </Modal>
    );
}
