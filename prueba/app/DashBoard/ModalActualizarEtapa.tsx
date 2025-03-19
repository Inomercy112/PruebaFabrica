import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";

interface Etapa {
  idDto: number;
  nombreEtapaDto: string;
  descripcionEtapaDto: string;
  estadoDto: number;
}

interface ModalActualizarEtapaProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  etapa: Etapa;
  onEtapaActualizada: () => void;
}

export default function ModalActualizarEtapa({
  open,
  setOpen,
  etapa,
  onEtapaActualizada,
}: ModalActualizarEtapaProps) {
  const [formData, setFormData] = useState({ nombreEtapaDto: "", descripcionEtapaDto: "", estadoDto : 1 });

  useEffect(() => {
    if (etapa) {
      setFormData({
        nombreEtapaDto: etapa.nombreEtapaDto,
        descripcionEtapaDto: etapa.descripcionEtapaDto,
        estadoDto: etapa.estadoDto

      });
    }
  }, [etapa, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEtapa = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/etapa/Actualizar/${etapa.idDto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Error al actualizar etapa: ${response.status}`);

      alert("Etapa actualizada correctamente");
      setOpen(false);
      onEtapaActualizada();
    } catch (error) {
      console.error("Error al actualizar etapa:", error);
      alert("Hubo un error al actualizar la etapa.");
    }
  };

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <Modal.Header>Actualizar Etapa</Modal.Header>
      <Modal.Body>
        <form className="space-y-4" onSubmit={handleUpdateEtapa}>
          <div>
            <label className="block text-sm font-medium dark:text-white">Nombre</label>
            <input
              type="text"
              name="nombreEtapaDto"
              value={formData.nombreEtapaDto}
              onChange={handleChange}
              required
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
