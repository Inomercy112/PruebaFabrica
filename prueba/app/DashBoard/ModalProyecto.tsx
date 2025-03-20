import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";

interface TipoProyecto {
  idDto: number;
  nombreTipoProyectoDto: string;
}

interface ModalProyectoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onProyectoCreado: () => void;
}

export default function ModalProyecto({ open, setOpen, onProyectoCreado }: ModalProyectoProps) {
  const [tiposProyecto, setTiposProyecto] = useState<TipoProyecto[]>([]);
  const [formData, setFormData] = useState({
    nombreDto: "",
    descripcionDto: "",
    estadoDto: 1,
    diaInicioDto: "",
    diaFinDto: "",
    estadoProyectoDto: { idDto: "1" },
    tipoProyectoDto: { idDto: "" }, 
  });

  useEffect(() => {
    if (open) {
      fetch("http://localhost:8080/proyecto/Consultar/TipoProyecto")
        .then((response) => response.json())
        .then((data) => setTiposProyecto(data))
        .catch((error) => console.error("Error al cargar tipos de proyecto:", error));
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "tipoProyectoDto") {
      setFormData((prev) => ({ ...prev, tipoProyectoDto: { idDto: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
      onProyectoCreado();

      setFormData({
        nombreDto: "",
        descripcionDto: "",
        estadoDto: 1,
        diaInicioDto: "",
        diaFinDto: "",
        estadoProyectoDto: { idDto: "1" },
        tipoProyectoDto: { idDto: "" },
      });
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
              placeholder="Nombre del proyecto"
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

          <div>
            <label className="block text-sm font-medium dark:text-white">Fecha de Inicio</label>
            <input
              type="date"
              name="diaInicioDto"
              value={formData.diaInicioDto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-white">Fecha de Fin</label>
            <input
              type="date"
              name="diaFinDto"
              value={formData.diaFinDto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-white">Tipo de Proyecto</label>
            <select
              name="tipoProyectoDto"
              value={formData.tipoProyectoDto.idDto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Seleccione un tipo de proyecto</option>
              {tiposProyecto.map((tipo) => (
                <option key={tipo.idDto} value={tipo.idDto}>
                  {tipo.nombreTipoProyectoDto}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Registrar Proyecto
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
