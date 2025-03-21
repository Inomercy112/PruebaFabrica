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
        <div className="w-full h-full p-4 sm:p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Etapas</h2>
                <button
                    onClick={() => setOpenForm(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <HiPlus className="text-xl" />
                    <span className="hidden sm:inline">Nueva Etapa</span>
                </button>
            </div>

            {/* Buscador */}
            <div className="flex justify-center sm:justify-start">
                <input
                    type="text"
                    placeholder="Buscar etapa..."
                    className="w-full sm:w-1/2 px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Lista de Etapas */}
            {etapasFiltradas.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No hay etapas disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {etapasFiltradas.map((etapa) => (
                        <div
                            key={etapa.idDto}
                            className="p-4 border rounded-lg shadow-sm flex flex-col bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
                        >
                            <span className="font-semibold text-gray-900 dark:text-white">{etapa.nombreEtapaDto}</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">{etapa.descripcionEtapaDto}</span>

                            {/* Botones */}
                            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mt-2">
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition w-full sm:w-auto"
                                    onClick={() => handleOpenUpdate(etapa)}
                                >
                                    <HiEye className="w-4 h-4" /> Ver
                                </Button>

                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition w-full sm:w-auto"
                                    onClick={() => handleOpenConfirm(etapa)}
                                >
                                    <HiXCircle className="w-4 h-4" /> Desactivar
                                </Button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* Modales */}
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
                        <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-900 dark:text-white">
                            ¿Estás seguro de que deseas desactivar la etapa{" "}
                            <strong>{selectedEtapa?.nombreEtapaDto}</strong>?
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                onClick={handleDesactivarEtapa}
                            >
                                Sí, desactivar
                            </Button>
                            <Button
                                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg transition"
                                onClick={() => setOpenConfirm(false)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );

}
