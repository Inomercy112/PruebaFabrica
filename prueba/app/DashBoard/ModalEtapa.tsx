import { useState } from "react";
import { Modal, Button } from "flowbite-react";

interface ModalRegistrarEtapaProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEtapaCreada: () => void;
}

export default function ModalEtapa({ open, setOpen, onEtapaCreada }: ModalRegistrarEtapaProps) {
  const [formData, setFormData] = useState({
    nombreEtapaDto: "",
    descripcionEtapaDto: "",
    estadoDto:1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/etapa/Guardar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Error al guardar la etapa: ${response.status}`);

      alert("Etapa registrada correctamente");
      setOpen(false);
      onEtapaCreada();
      setFormData({ nombreEtapaDto: "", descripcionEtapaDto: "" , estadoDto : 1 });
    } catch (error) {
      console.error("Error al registrar la etapa:", error);
      alert("Hubo un error al registrar la etapa.");
    }
  };

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <Modal.Header>Registrar Etapa</Modal.Header>
      <Modal.Body>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium dark:text-white">Nombre</label>
            <input
              type="text"
              name="nombreEtapaDto"
              value={formData.nombreEtapaDto}
              onChange={handleChange}
              required
              placeholder="Nombre de la etapa"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-white">Descripción</label>
            <textarea
              name="descripcionEtapaDto"
              value={formData.descripcionEtapaDto}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Descripción de la etapa"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Guardar Etapa
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
