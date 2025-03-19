import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiXCircle, HiUserAdd } from "react-icons/hi";
import ModalProyecto from "./ModalProyecto";
import ModalActualizarProyecto from "./ModalProyectoActualizar";

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

export default function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
    const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const response = await fetch("http://localhost:8080/proyecto/Consultar");
            const data = await response.json();
            setProyectos(data);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
        }
    };

    const cargarUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:8080/usuario/Consultar");
            const data = await response.json();
            const usuariosFiltrados = data.filter((usuario: Usuario) =>
                usuario.rolDto.idDto === 2 || usuario.rolDto.idDto === 3
            );
            setUsuarios(usuariosFiltrados);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
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

    const handleAssignWorker = async () => {
        if (!selectedProyecto || selectedUsuario === null) return;

        try {
            const response = await fetch(
                `http://localhost:8080/usuarioProyecto/Registrar/${selectedProyecto.idDto}/${selectedUsuario}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) throw new Error(`Error al asignar usuario: ${response.status}`);

            alert("Usuario asignado correctamente");
            setOpenAssign(false);
            cargarProyectos();
        } catch (error) {
            console.error("Error al asignar usuario:", error);
            alert("Error al asignar usuario al proyecto.");
        }
    };

    // 🔹 Buscar proyectos por nombre
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
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de asignar usuario */}
            <Modal show={openAssign} onClose={() => setOpenAssign(false)}>
                <Modal.Header>Asignar Usuario al Proyecto</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium dark:text-white">Seleccionar Usuario</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            value={selectedUsuario ?? ""}
                            onChange={(e) => setSelectedUsuario(Number(e.target.value))}
                        >
                            <option value="">Seleccione un usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.idDto} value={usuario.idDto}>
                                    {usuario.nombreDto} {usuario.apellidoDto}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success" onClick={handleAssignWorker}>
                        Asignar
                    </Button>
                    <Button color="gray" onClick={() => setOpenAssign(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
