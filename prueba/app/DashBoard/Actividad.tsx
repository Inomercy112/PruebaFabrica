"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import ModalRegistroError from "./ModalRegistroError";


interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
}

interface Proyecto {
    idDto: number;
    nombreDto: string;
    descripcionDto: string;
    estadoProyectoDto: {
        idDto: number;
        nombreEstadoDto: string;
    };
    diaInicioDto: string;
    diaFinDto: string;
    tipoProyectoDto: {
        idDto: number;
        nombreTipoProyectoDto: string;
    };
}

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
    estadoDto: number;
}

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
    estadoActividadDto: number;
    etapaDto: Etapa;
    ejecucionDto: string
}

interface ActividadUsuario {
    idDto: number;
    idDesarrolladorDto: {
        idUsuarioDto: Usuario;
        idProyectoDto: Proyecto;
    };
    idActividadEtapaDto: Actividad[];
    ejecucionDto: string;
}



export default function ActividadUsuarioPage() {
    const [user, setUser] = useState<Usuario | null>(null);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState<Actividad | null>(null);
    const [actividadesUsuario, setActividadesUsuario] = useState<ActividadUsuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const estadosEjecucion = [
        "En progreso",
        "Finalizado con éxito",
        "Finalizado con problemas"
    ];
    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "Finalizado con éxito":
                return "bg-green-200 text-green-800";
            case "En progreso":
                return "bg-blue-200 text-blue-800";
            case "Finalizado con problemas":
                return "bg-yellow-200 text-yellow-800";
            case "2":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            cargarActividades(parsedUser.idDto);
        } else {
            router.push("/sobreNosotros");
        }
    }, []);

    const cargarActividades = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/actividadUsuario/Consultar/${userId}`);
            if (!response.ok) throw new Error(`Error al obtener actividades: ${response.status}`);
            const data = await response.json();
            setActividadesUsuario(data);
        } catch (error) {
            console.error("Error al obtener las actividades del usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenErrorModal = (actividad: Actividad) => {
        if (!actividad) return;
        setActividadSeleccionada(actividad);
        setOpenErrorModal(true);
    };

    const handleUpdateEjecucion = async (actividadUsuario: ActividadUsuario, nuevoEstado: string) => {
        setLoading(true);
    
        // Solo enviar ID y el nuevo estado
        const updatedData = {
            idDto: actividadUsuario.idDto,
            ejecucionDto: nuevoEstado
        };
    
        try {
            const response = await fetch(`http://localhost:8080/actividadUsuario/Actualizar/${actividadUsuario.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) throw new Error(`Error al actualizar estado: ${response.status}`);
    
            // Actualizar estado localmente sin recargar todas las actividades
            setActividadesUsuario((prevActividades) =>
                prevActividades.map((act) =>
                    act.idDto === actividadUsuario.idDto ? { ...act, ejecucionDto: nuevoEstado } : act
                )
            );
    
        } catch (error) {
            console.error("Error al actualizar ejecución:", error);
            alert("Hubo un problema al actualizar la ejecución.");
        } finally {
            setLoading(false);
        }
    };
    

    const filtrarActividades = () => {
        return actividadesUsuario.filter((actividadUsuario) =>
            actividadUsuario.idActividadEtapaDto.some((actividad) =>
                actividad.nombreActividadDto.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Actividades Asignadas</h1>

                {/* Input de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar actividad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />

                {/* Verificar si hay actividades asignadas */}
                {loading ? (
                    <p className="text-center text-gray-500 mt-4">Cargando actividades...</p>
                ) : actividadesUsuario.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No tienes actividades asignadas.</p>
                ) : filtrarActividades().length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No hay actividades que coincidan con la búsqueda.</p>
                ) : (
                    <div className="mt-6 space-y-6">
                        {filtrarActividades().map((actividadUsuario) => (
                            <div key={actividadUsuario.idDto} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Proyecto: {actividadUsuario.idDesarrolladorDto.idProyectoDto.nombreDto}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">{actividadUsuario.idDesarrolladorDto.idProyectoDto.descripcionDto}</p>

                                <h3 className="mt-4 text-md font-semibold text-gray-900 dark:text-white">Actividades:</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {actividadUsuario.idActividadEtapaDto.map((actividad) => (
                                        <li key={actividad.idDto} className="ml-4 mt-2 p-2 border-b dark:border-gray-600">
                                            <strong className="text-gray-900 dark:text-white">{actividad.nombreActividadDto}:</strong>{" "}
                                            {actividad.descripcionActividadDto}
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Etapa:</strong> {actividad.etapaDto.nombreEtapaDto} - {actividad.etapaDto.descripcionEtapaDto}
                                            </p>

                                            {/* Botón para cambiar estado */}
                                            <button
                                                onClick={() => {
                                                    if (!loading) {
                                                        const nextEstadoIndex =
                                                            (estadosEjecucion.indexOf(actividadUsuario.ejecucionDto) + 1) % estadosEjecucion.length;
                                                        handleUpdateEjecucion(
                                                            actividadUsuario,
                                                            estadosEjecucion[nextEstadoIndex],
                                                            setLoading
                                                        );
                                                    }
                                                }}
                                                className={`text-xs font-semibold inline-block px-2 py-1 rounded-full mt-1 transition cursor-pointer ${getEstadoColor(actividadUsuario.ejecucionDto)
                                                    }`}
                                                disabled={loading}
                                            >
                                                {loading ? "Actualizando..." : (
                                                    <>
                                                        {actividadUsuario.ejecucionDto || "En espera"}
                                                        <span className="ml-2 text-gray-500 dark:text-gray-400 text-[10px]">
                                                            🔄 {estadosEjecucion[
                                                                (estadosEjecucion.indexOf(actividadUsuario.ejecucionDto) + 1) % estadosEjecucion.length
                                                            ]}
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                            <Button
                                                color="failure"
                                                onClick={() => handleOpenErrorModal(actividad)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-2"
                                            >
                                                Reportar Error
                                            </Button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4">
                                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">Ejecución:</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{actividadUsuario.ejecucionDto || "No especificado"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de error */}
            {actividadSeleccionada && (
                <ModalRegistroError
                    open={openErrorModal}
                    setOpen={setOpenErrorModal}
                    actividad={actividadSeleccionada}
                    onErrorRegistrado={() => user && cargarActividades(user.idDto)}
                />
            )}
        </div>
    );

}