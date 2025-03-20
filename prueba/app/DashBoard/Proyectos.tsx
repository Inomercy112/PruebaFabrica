import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import ModalProyecto from "./ModalProyecto"; // Importamos el modal de registro
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
    tipoProyectoDto:{
        idDto:number;
        nombreTipoProyectoDto:string;
    }
}

export default function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false); // Estado para el modal de registro
    const router = useRouter();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        const response = await fetch("http://localhost:8080/proyecto/Consultar");
        const data = await response.json();
        setProyectos(data);
    };


    const handleOpenUpdate = (proyecto: Proyecto) => {
        setSelectedProyecto(proyecto);
        setOpenUpdate(true);
    };

    const handleVerProyecto = (proyecto: Proyecto) => {
        router.push(`/proyecto/${proyecto.idDto}`); // Redirige a la página de detalles
    };

    const proyectosFiltrados = proyectos.filter((proyecto) =>
        proyecto.nombreDto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Proyectos</h2>
                <button
                    onClick={() => setOpenForm(true)} // Abre el modal de registro
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
                            <span className="text-gray-500 text-sm">{proyecto.tipoProyectoDto.nombreTipoProyectoDto}</span>
                            <span className="text-sm text-gray-700">
                                Inicio: {proyecto.diaInicioDto} - Fin: {proyecto.diaFinDto}
                            </span>
                            <span className={`text-sm ${proyecto.estadoDto === 1 ? "text-green-600" : "text-red-600"}`}>
                                Estado: {proyecto.estadoProyectoDto.nombreEstadoDto}
                            </span>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button color="info" size="xs" onClick={() => handleVerProyecto(proyecto)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Ver
                                </Button>
                                <Button color="info" size="xs" onClick={() => handleOpenUpdate(proyecto)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Datos del proyecto
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


                        <ModalProyecto open={openForm} setOpen={setOpenForm} onProyectoCreado={cargarProyectos} />
            {selectedProyecto && (
                <ModalActualizarProyecto open={openUpdate} setOpen={setOpenUpdate} proyecto={selectedProyecto} onProyectoActualizado={cargarProyectos} />
            )}
        </div>
    );
}
