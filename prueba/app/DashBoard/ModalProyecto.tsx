import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface ModalProyectoProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onProyectoCreado: () => void;
}

export default function ModalProyecto({ open, setOpen, onProyectoCreado }: ModalProyectoProps) {
    const [formData, setFormData] = useState({
        nombreDto: "",
        descripcionDto: "",
        estadoDto: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/proyecto/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error al guardar proyecto: ${response.status}`);

            alert("Proyecto registrado exitosamente");
            setOpen(false);
            onProyectoCreado(); // 🔹 Actualiza la lista de proyectos después de registrar
            setFormData({ nombreDto: "", descripcionDto: "", estadoDto: 1 }); // Resetear formulario
        } catch (error) {
            console.error("Error al registrar proyecto:", error);
            alert("Hubo un error al registrar el proyecto.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Registrar Proyecto</Modal.Header>
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium dark:text-white">Nombre</label>
                        <input
                            type="text"
                            name="nombreDto"
                            value={formData.nombreDto}
                            onChange={handleChange}
                            required
                            placeholder="nombre del proyecto"
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
                            title="descripcion"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Registrar Proyecto
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
