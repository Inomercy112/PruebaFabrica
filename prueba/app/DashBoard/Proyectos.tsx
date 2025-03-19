import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiXCircle, HiUserAdd } from "react-icons/hi";
import ModalProyecto from "./ModalProyecto";
import ModalActualizarProyecto from "./ModalProyectoActualizar";
import ModalAsignarUsuario from "./ModalAsignarUsuario";
import ModalAsignarEtapa from "./ModalAsignarEtapa";

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
interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
    rolDto: {
        idDto: number;
    };
}
interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
    estadoDto: number;
}

export default function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [openAssignEtapa, setOpenAssignEtapa] = useState(false);
    const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
    const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);
    const [selectedEtapa, setSelectedEtapa] = useState<number | null>(null);
    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        const response = await fetch("http://localhost:8080/proyecto/Consultar");
        const data = await response.json();
        setProyectos(data);
    };

    const cargarUsuarios = async () => {
        const response = await fetch("http://localhost:8080/usuario/Consultar");
        const data = await response.json();
        setUsuarios(data);
    };

    const cargarEtapas = async () => {
        const response = await fetch("http://localhost:8080/etapa/Consultar");
        const data = await response.json();
        setEtapas(data);
    };


    const handleOpenUpdate = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto);
        setOpenUpdate(true);
    };

    const handleOpenConfirm = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto);
        setOpenConfirm(true);
    };

    const handleOpenAssign = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto);
        setOpenAssign(true);
        cargarUsuarios();
    };

    const handleOpenAssignEtapa = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto);
        setOpenAssignEtapa(true);
        cargarEtapas();
    };

    const handleDesactivarProyecto = async () => {
        if (!selectedProyecto) return;

        try {
            const proyectoActualizado = {
                ...selectedProyecto,
                estadoDto: 2,
                estadoProyectoDto: { idDto: 5, nombreEstadoDto: "desactivado" },
            };

            const response = await fetch(`http://localhost:8080/proyecto/Actualizar/${selectedProyecto.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(proyectoActualizado),
            });

            if (!response.ok) throw new Error(`Error al desactivar proyecto: ${response.status}`);

            setProyectos((prev) =>
                prev.map((p) => (p.idDto === selectedProyecto.idDto ? proyectoActualizado : p))
            );

            alert("Proyecto desactivado correctamente");
            setOpenConfirm(false);
        } catch (error) {
            console.error("Error al desactivar proyecto:", error);
            alert("Error al desactivar el proyecto.");
        }
    };


    const proyectosFiltrados = proyectos.filter((proyecto) =>
        proyecto.nombreDto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Proyectos</h2>
                <button
                    onClick={() => setOpenForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <HiPlus className="text-xl" />
                    <span className="hidden sm:inline">Nuevo</span>
                </button>
            </div>

            <div className="flex justify-center sm:justify-start">
                <input
                    type="text"
                    placeholder="Buscar proyecto..."
                    className="w-full sm:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {proyectosFiltrados.length === 0 ? (
                <p className="text-center text-gray-500">No hay proyectos disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proyectosFiltrados.map((proyecto) => (
                        <div key={proyecto.idDto} className="p-4 border rounded-lg shadow-sm flex flex-col">
                            <span className="font-semibold">{proyecto.nombreDto}</span>
                            <span className="text-gray-500 text-sm">{proyecto.descripcionDto}</span>
                            <span className="text-sm text-gray-700">
                                Inicio: {proyecto.diaInicioDto} - Fin: {proyecto.diaFinDto}
                            </span>
                            <span className={`text-sm ${proyecto.estadoDto === 1 ? "text-green-600" : "text-red-600"}`}>
                                Estado: {proyecto.estadoProyectoDto.nombreEstadoDto}
                            </span>
                            <div className="flex gap-2 mt-2">
                                <Button color="info" size="xs" onClick={() => handleOpenUpdate(proyecto)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Ver
                                </Button>
                                <Button color="failure" size="xs" onClick={() => handleOpenConfirm(proyecto)}>
                                    <HiXCircle className="w-4 h-4 mr-1" /> Desactivar
                                </Button>
                                <Button color="success" size="xs" onClick={() => handleOpenAssign(proyecto)}>
                                    <HiUserAdd className="w-4 h-4 mr-1" /> Asignar Usuario
                                </Button>
                                <Button color="success" size="xs" onClick={() => handleOpenAssignEtapa(proyecto)}>
                                    <HiUserAdd className="w-4 h-4 mr-1" /> Asignar Etapa
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={openConfirm} onClose={() => setOpenConfirm(false)} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiXCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                        <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Estás seguro de que deseas desactivar el proyecto <strong>{selectedProyecto?.nombreDto}</strong>?
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button color="failure" onClick={handleDesactivarProyecto}>
                                Sí, desactivar
                            </Button>
                            <Button color="gray" onClick={() => setOpenConfirm(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <ModalAsignarUsuario
                open={openAssign}
                setOpen={setOpenAssign}
                usuarios={usuarios}
                selectedProyectoId={selectedProyecto?.idDto ?? null}
                onUsuarioAsignado={cargarProyectos}
            />

            <ModalAsignarEtapa
                open={openAssignEtapa}
                setOpen={setOpenAssignEtapa}
                etapas={etapas}
                selectedProyectoId={selectedProyecto?.idDto ?? null}
                onEtapaAsignada={cargarProyectos}
            />


            <ModalProyecto open={openForm} setOpen={setOpenForm} onProyectoCreado={cargarProyectos} />
            {selectedProyecto && (
                <ModalActualizarProyecto open={openUpdate} setOpen={setOpenUpdate} proyecto={selectedProyecto} onProyectoActualizado={cargarProyectos} />
            )}
        </div>
    );
}
