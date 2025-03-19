import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiXCircle } from "react-icons/hi";
import ModalEtapa from "./ModalEtapa";
import ModalActualizarEtapa from "./ModalActualizarEtapa";

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
    estadoDto: number;
    
}

export default function Etapas() {
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedEtapa, setSelectedEtapa] = useState<Etapa | null>(null);

    useEffect(() => {
        cargarEtapas();
    }, []);

    const cargarEtapas = async () => {
        try {
            const response = await fetch("http://localhost:8080/etapa/Consultar");
            const data = await response.json();
            setEtapas(data);
        } catch (error) {
            console.error("Error al cargar etapas:", error);
        }
    };

    const handleOpenUpdate = (etapa: Etapa) => {
        setSelectedEtapa(etapa);
        setOpenUpdate(true);
    };

    const handleOpenConfirm = (etapa: Etapa) => {
        setSelectedEtapa(etapa);
        setOpenConfirm(true);
    };

    const handleDesactivarEtapa = async () => {
        if (!selectedEtapa) return;
    
        try {
            const etapaActualizada = { ...selectedEtapa, estadoDto: 2 };
    
            const response = await fetch(`http://localhost:8080/etapa/Actualizar/${selectedEtapa.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(etapaActualizada),
            });
    
            if (!response.ok) throw new Error(`Error al desactivar etapa: ${response.status}`);
    
            setEtapas((prev) =>
                prev.map((e) => (e.idDto === selectedEtapa.idDto ? etapaActualizada : e))
            );
    
            alert("Etapa desactivada correctamente");
            setOpenConfirm(false);
        } catch (error) {
            console.error("Error al desactivar etapa:", error);
            alert("Error al desactivar la etapa.");
        }
    };

    const etapasFiltradas = etapas.filter((etapa) =>
        etapa.nombreEtapaDto.toLowerCase().includes(search.toLowerCase())
    );

    


    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Etapas</h2>
                <button
                    onClick={() => setOpenForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <HiPlus className="text-xl" />
                    <span className="hidden sm:inline">Nueva Etapa</span>
                </button>
            </div>

            <div className="flex justify-center sm:justify-start">
                <input
                    type="text"
                    placeholder="Buscar etapa..."
                    className="w-full sm:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {etapasFiltradas.length === 0 ? (
                <p className="text-center text-gray-500">No hay etapas disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {etapas.map((etapa) => (
                        <div key={etapa.idDto} className="p-4 border rounded-lg shadow-sm flex flex-col">
                            <span className="font-semibold">{etapa.nombreEtapaDto}</span>
                            <span className="text-gray-500 text-sm">{etapa.descripcionEtapaDto}</span>
                            <div className="flex gap-2 mt-2">
                                <Button color="info" size="xs" onClick={() => handleOpenUpdate(etapa)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Ver
                                </Button>
                                <Button color="failure" size="xs" onClick={() => handleOpenConfirm(etapa)}>
                                    <HiXCircle className="w-4 h-4 mr-1" /> Desactivar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedEtapa && (
                <ModalActualizarEtapa
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    etapa={selectedEtapa}
                    onEtapaActualizada={cargarEtapas}
                />
            )}

            <ModalEtapa open={openForm} setOpen={setOpenForm} onEtapaCreada={cargarEtapas} />

            <Modal show={openConfirm} onClose={() => setOpenConfirm(false)} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiXCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                        <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Estás seguro de que deseas desactivar la etapa <strong>{selectedEtapa?.nombreEtapaDto}</strong>?
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button color="failure" onClick={handleDesactivarEtapa}>
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
