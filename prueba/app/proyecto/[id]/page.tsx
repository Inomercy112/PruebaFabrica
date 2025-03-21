"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiArrowLeft, HiXCircle, HiUserAdd, HiEye } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import DashboardSidebar from "@/app/DashBoard/DashboardSidebar";
import { MyFooter } from "@/app/sobreNosotros/footer";

import ModalVerEtapas from "@/app/DashBoard/ModalEtapaProyecto";
import ModalRegistrarActividad from "@/app/DashBoard/ModalRegistrarActividad";
import ModalAsignarUsuario from "@/app/DashBoard/ModalAsignarUsuario";
import ModalAsignarActividad from "@/app/DashBoard/ModalAsignarActividadEtapa";
import ModalAsignarEtapa from "@/app/DashBoard/ModalAsignarEtapa";

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

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
}

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
    actividades: Actividad[];
    fechaInicio: string;
    fechaFin: string;
}

interface User {
    rolDto: {
        idDto: number;
    };
}

export default function ProyectoDetalle() {
    const { id } = useParams();
    const projectId = Number(id);
    const router = useRouter();

    // Estados principales
    const [proyecto, setProyecto] = useState<Proyecto | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [etapasAsignadas, setEtapasAsignadas] = useState<Etapa[]>([]);

    const [openAssignActivity, setOpenAssignActivity] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [openAssignEtapa, setOpenAssignEtapa] = useState(false);
    const [openEtapasModal, setOpenEtapasModal] = useState(false);
    const [openAssignActividad, setOpenAssignActividad] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/sobreNosotros");
        }
    }, []);

    useEffect(() => {
        if (!id) return;
        fetchProyecto();
    }, [id]);

    const fetchProyecto = async () => {
        try {
            const response = await fetch(`http://localhost:8080/proyecto/Consultar/${id}`);
            if (!response.ok) throw new Error("Error al cargar el proyecto");
            const data = await response.json();
            setProyecto(data);
        } catch (error) {
            console.error("Error al obtener el proyecto:", error);
        }
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
    const cargarEtapasProyecto = async () => {
        try {
            const response = await fetch(`http://localhost:8080/etapaProyecto/Consultar/${id}`);
            if (!response.ok) {
                throw new Error(`Error al obtener etapas: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error("Respuesta inesperada del backend:", data);
                return;
            }
            setEtapasAsignadas(data);
        } catch (error) {
            console.error("Error al obtener etapas asignadas:", error);
        }
    };


    const handleDesactivarProyecto = async () => {
        if (!proyecto) return;
        try {
            await fetch(`http://localhost:8080/proyecto/Actualizar/${proyecto.idDto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...proyecto, estadoDto: 2 }),
            });

            alert("Proyecto desactivado correctamente");
            router.back();
        } catch (error) {
            alert("Error al desactivar el proyecto.");
        }
    };
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/sobreNosotros");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/sobreNosotros");
    };

    const handleOpenAssignActividad = async () => {
        await cargarEtapasProyecto();
        setOpenAssignActividad(true);
    };



    const handleOpenEtapas = async () => {
        await cargarEtapasProyecto();

        setOpenEtapasModal(true);
    };
    const handleOpenAssign = () => {

        setOpenAssign(true);
        cargarUsuarios();
    };

    if (!proyecto) return <p className="text-center text-red-500">No se encontró el proyecto.</p>;


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex bg-gray-100 dark:bg-gray-900">
                <DashboardSidebar user={user} handleLogout={handleLogout} />

                <div className="flex flex-col flex-1">
                    <main className="flex-1 p-6">
                        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-4">

                            <button
                                onClick={() => router.back()}
                                className="text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:underline py-2 px-3 rounded-md"
                            >
                                <HiArrowLeft className="w-5 h-5" /> Volver
                            </button>

                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{proyecto.nombreDto}</h1>
                            <p className="text-gray-600 dark:text-gray-300">{proyecto.descripcionDto}</p>

                            <div className="border-t divide-y divide-gray-200 dark:divide-gray-700 pt-4">
                                <p className="text-gray-500 dark:text-gray-400"><strong>Inicio:</strong> {proyecto.diaInicioDto}</p>
                                <p className="text-gray-500 dark:text-gray-400"><strong>Fin:</strong> {proyecto.diaFinDto}</p>
                                <p className={`font-semibold ${proyecto.estadoDto === 1 ? "text-green-600" : "text-red-600"}`}>
                                    <strong>Estado:</strong> {proyecto.estadoProyectoDto.nombreEstadoDto}
                                </p>
                            </div>

                            {/* Botones de acciones */}
                            <div className="mt-6 flex flex-wrap gap-3 justify-start">
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={() => setOpenConfirm(true)}
                                >
                                    <HiXCircle className="w-5 h-5" /> Desactivar Proyecto
                                </Button>

                                <Button
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={() => { cargarEtapas(); setOpenAssignEtapa(true); }}
                                >
                                    <HiUserAdd className="w-5 h-5" /> Asignar Etapa
                                </Button>

                                <Button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={() => (handleOpenEtapas())}
                                >
                                    <HiEye className="w-5 h-5" /> Ver Etapas
                                </Button>

                                <Button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={handleOpenAssignActividad}
                                >
                                    <HiUserAdd className="w-5 h-5" /> Asignar Actividad
                                </Button>

                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={() => handleOpenAssign()}
                                >
                                    <HiUserAdd className="w-5 h-5" /> Asignar Usuario
                                </Button>

                                <Button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition"
                                    onClick={() => setOpenAssignActivity(true)}
                                >
                                    <HiUserAdd className="w-5 h-5" /> Asignar Actividad a Usuario
                                </Button>
                            </div>

                        </div>
                    </main>

                    <MyFooter />
                </div>

                <Modal show={openConfirm} onClose={() => setOpenConfirm(false)}>
                    <Modal.Body>
                        <div className="text-center space-y-4">
                            <HiXCircle className="mx-auto w-12 h-12 text-red-600" />
                            <p className="text-lg text-gray-900 dark:text-white">
                                ¿Desactivar el proyecto <strong>{proyecto.nombreDto}</strong>?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={handleDesactivarProyecto}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
                                >
                                    Sí, Desactivar
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => setOpenConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition rounded-lg"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <ModalAsignarActividad
                    open={openAssignActividad}
                    setOpen={setOpenAssignActividad}
                    etapas={etapasAsignadas}
                    selectedProyectoId={projectId}
                    onActividadAsignada={cargarEtapasProyecto}
                />
                <ModalAsignarEtapa
                    open={openAssignEtapa}
                    setOpen={setOpenAssignEtapa}
                    etapas={etapas}
                    selectedProyectoId={projectId}
                    onEtapaAsignada={fetchProyecto}
                />
                <ModalVerEtapas
                    open={openEtapasModal}
                    setOpen={setOpenEtapasModal}
                    etapas={etapasAsignadas}
                    proyectoNombre={proyecto.nombreDto}
                />


                <ModalRegistrarActividad
                    open={openAssignActivity}
                    setOpen={setOpenAssignActivity}
                    proyectoId={projectId}
                    onActividadAsignada={() => console.log("Actividad registrada exitosamente")}
                />
                <ModalAsignarUsuario
                    open={openAssign}
                    setOpen={setOpenAssign}
                    usuarios={usuarios}
                    selectedProyectoId={projectId}
                    onUsuarioAsignado={fetchProyecto}
                />
            </div>
        </div>
    );
}
