import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiXCircle } from "react-icons/hi";
import ModalActividad from "./ModalActividad";
import ModalActualizarActividad from "./ModalActualizarActividad";

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
    estadoActividadDto: number;

}

export default function Actividades() {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedActividad, setSelectedActividad] = useState<Actividad | null>(null);

    useEffect(() => {
        cargarActividades();
    }, []);

    const cargarActividades = async () => {
        try {
            const response = await fetch("http://localhost:8080/actividad/Consultar");
            const data = await response.json();
            setActividades(data);
        } catch (error) {
            console.error("Error al cargar actividades:", error);
        }
    };

    const handleOpenUpdate = (actividad: Actividad) => {
        setSelectedActividad(actividad);
        setOpenUpdate(true);
    };

    const handleOpenConfirm = (actividad: Actividad) => {
        setSelectedActividad(actividad);
        setOpenConfirm(true);
    };

    const handleDesactivarActividad = async () => {
        if (!selectedActividad) return;

        try {
            const actividadActualizada = { ...selectedActividad, estadoActividadDto: 2 };

            const response = await fetch(`http://localhost:8080/actividad/Actualizar/${selectedActividad.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actividadActualizada),
            });

            if (!response.ok) throw new Error(`Error al desactivar actividad: ${response.status}`);

            setActividades((prev) =>
                prev.map((a) => (a.idDto === selectedActividad.idDto ? actividadActualizada : a))
            );

            alert("Actividad desactivada correctamente");
            setOpenConfirm(false);
        } catch (error) {
            console.error("Error al desactivar actividad:", error);
            alert("Error al desactivar la actividad.");
        }
    };

    const actividadesFiltradas = actividades.filter((actividad) =>
        actividad.nombreActividadDto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Actividades</h2>
                <button
                    onClick={() => setOpenForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <HiPlus className="text-xl" />
                    <span className="hidden sm:inline">Nueva Actividad</span>
                </button>
            </div>

            <div className="flex justify-center sm:justify-start">
                <input
                    type="text"
                    placeholder="Buscar actividad..."
                    className="w-full sm:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {actividadesFiltradas.length === 0 ? (
                <p className="text-center text-gray-500">No hay actividades disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {actividadesFiltradas.map((actividad) => (
                        <div key={actividad.idDto} className="p-4 border rounded-lg shadow-sm flex flex-col">
                            <span className="font-semibold">{actividad.nombreActividadDto}</span>
                            <span className="text-gray-500 text-sm">{actividad.descripcionActividadDto}</span>
                            <div className="flex gap-2 mt-2">
                                <Button color="info" size="xs" onClick={() => handleOpenUpdate(actividad)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Ver
                                </Button>
                                <Button color="failure" size="xs" onClick={() => handleOpenConfirm(actividad)}>
                                    <HiXCircle className="w-4 h-4 mr-1" /> Desactivar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedActividad && (
                <ModalActualizarActividad
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    actividad={selectedActividad}
                    onActividadActualizada={cargarActividades}
                />
            )}

            <ModalActividad open={openForm} setOpen={setOpenForm} onActividadCreada={cargarActividades} />

            <Modal show={openConfirm} onClose={() => setOpenConfirm(false)} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiXCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                        <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Estás seguro de que deseas desactivar la actividad <strong>{selectedActividad?.nombreActividadDto}</strong>?
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button color="failure" onClick={handleDesactivarActividad}>
                                Sí, desactivar
                            </Button>
                            <Button color="gray" onClick={() => setOpenConfirm(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}
