import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { HiEye, HiPlus } from "react-icons/hi";
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
    tipoProyectoDto: {
        idDto: number;
        nombreTipoProyectoDto: string;
    }
}

export default function Proyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
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
        router.push(`?vista=proyecto&id=${proyecto.idDto}`, { scroll: false });
    };

    const handleDescargarPDF = async (idProyecto: number) => {
        try {
            const response = await fetch(`http://localhost:8080/reportes/pdf/proyecto/${idProyecto}`);
            if (!response.ok) throw new Error("Error al generar el PDF");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `reporte_proyecto_${idProyecto}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
            alert("No se pudo descargar el reporte PDF");
        }
    };



    const proyectosFiltrados = proyectos.filter((proyecto) =>
        proyecto.nombreDto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-full p-4 sm:p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">



                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Proyectos</h2>
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
                        className="w-full sm:w-96 px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {proyectosFiltrados.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No hay proyectos disponibles.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {proyectosFiltrados.map((proyecto) => (
                            <div key={proyecto.idDto} className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-white">{proyecto.nombreDto}</span>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{proyecto.descripcionDto}</span>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{proyecto.tipoProyectoDto.nombreTipoProyectoDto}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Inicio: {proyecto.diaInicioDto} - Fin: {proyecto.diaFinDto}
                                </span>
                                <span className={`text-sm ${proyecto.estadoDto === 1 ? "text-green-600" : "text-red-600"}`}>
                                    Estado: {proyecto.estadoProyectoDto.nombreEstadoDto}
                                </span>

                                {/* Botones */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Button color="info" size="xs" onClick={() => handleVerProyecto(proyecto)}>
                                        <HiEye className="w-4 h-4 mr-1" /> Ver
                                    </Button>
                                    <Button color="info" size="xs" onClick={() => handleOpenUpdate(proyecto)}>
                                        <HiEye className="w-4 h-4 mr-1" /> Datos del proyecto
                                    </Button>
                                    <Button color="success" size="xs" onClick={() => handleDescargarPDF(proyecto.idDto)}>
                                        <FaRegFilePdf /> Generar Reporte

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
        </div>
    );
}
