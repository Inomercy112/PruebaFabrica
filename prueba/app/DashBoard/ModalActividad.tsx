import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface ModalRegistrarActividadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onActividadCreada: () => void;
}

export default function ModalActividad({ open, setOpen, onActividadCreada }: ModalRegistrarActividadProps) {
    const [formData, setFormData] = useState({
        nombreActividadDto: "",
        descripcionActividadDto: "",
        estadoActividadDto: 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/actividad/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error al guardar la actividad: ${response.status}`);

            alert("Actividad registrada correctamente");
            setOpen(false);
            onActividadCreada();
            setFormData({ nombreActividadDto: "", descripcionActividadDto: "", estadoActividadDto: 1 });
        } catch (error) {
            console.error("Error al registrar la actividad:", error);
            alert("Hubo un error al registrar la actividad.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Registrar Actividad</Modal.Header>
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                            Guardar Actividad
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
