import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
    estadoActividadDto: number;
}

interface ModalActualizarActividadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    actividad: Actividad;
    onActividadActualizada: () => void;
}

export default function ModalActualizarActividad({
    open,
    setOpen,
    actividad,
    onActividadActualizada,
}: ModalActualizarActividadProps) {
    const [formData, setFormData] = useState({
        nombreActividadDto: "",
        descripcionActividadDto: "",
        estadoActividadDto: 1,
    });

    useEffect(() => {
        if (actividad) {
            setFormData({
                nombreActividadDto: actividad.nombreActividadDto,
                descripcionActividadDto: actividad.descripcionActividadDto,
                estadoActividadDto: actividad.estadoActividadDto,
            });
        }
    }, [actividad, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateActividad = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/actividad/Actualizar/${actividad.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error al actualizar actividad: ${response.status}`);

            alert("Actividad actualizada correctamente");
            setOpen(false);
            onActividadActualizada();
        } catch (error) {
            console.error("Error al actualizar actividad:", error);
            alert("Hubo un error al actualizar la actividad.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Actualizar Actividad</Modal.Header>
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleUpdateActividad}>
                    <div>
                        <label className="block text-sm font-medium dark:text-white">Nombre</label>
                        <input
                            type="text"
                            name="nombreActividadDto"
                            value={formData.nombreActividadDto}
                            onChange={handleChange}
                            required
                            placeholder="Nombre de la actividad"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Descripción</label>
                        <textarea
                            name="descripcionActividadDto"
                            value={formData.descripcionActividadDto}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Descripción de la actividad"
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
            </Modal.Body>
        </Modal>
    );
}
