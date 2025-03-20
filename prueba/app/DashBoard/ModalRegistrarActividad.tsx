import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
}

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
    estadoActividadDto: number;
}

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
    actividades: Actividad[];
}

interface ModalRegistrarActividadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    proyectoId: number;
    onActividadAsignada: () => void;
}

export default function ModalRegistrarActividad({
    open,
    setOpen,
    proyectoId,
    onActividadAsignada
}: ModalRegistrarActividadProps) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);
    const [selectedActividades, setSelectedActividades] = useState<number[]>([]);
    const [ejecucion, setEjecucion] = useState("");

    // Cargar usuarios del proyecto y actividades organizadas por etapas
    useEffect(() => {
        if (open) {
            fetch(`http://localhost:8080/proyecto/Consultar/UsuarioProyecto/${proyectoId}`)
                .then(res => res.json())
                .then(data => setUsuarios(data))
                .catch(error => console.error("Error al obtener usuarios:", error));

            fetch(`http://localhost:8080/etapaProyecto/Consultar/${proyectoId}`)
                .then(res => res.json())
                .then(data => {
                    const etapasOrganizadas = data.map((etapa: any) => ({
                        idDto: etapa.etapaDto?.idDto ?? null,
                        nombreEtapaDto: etapa.etapaDto?.nombreEtapaDto ?? "Sin nombre",
                        descripcionEtapaDto: etapa.etapaDto?.descripcionEtapaDto ?? "Sin descripción",
                        actividades: Array.isArray(etapa.actividadDto)
                            ? etapa.actividadDto.map((actividad: any) => ({
                                idDto: actividad.idDto ?? null,
                                nombreActividadDto: actividad.nombreActividadDto ?? "Sin nombre",
                                descripcionActividadDto: actividad.descripcionActividadDto ?? "Sin descripción",
                                estadoActividadDto: actividad.estadoActividadDto ?? 0,
                            }))
                            : []
                    }));
                    setEtapas(etapasOrganizadas);
                })
                .catch(error => console.error("Error al obtener etapas con actividades:", error));
        }
    }, [open, proyectoId]);

    const handleRegister = async () => {
        if (!selectedUsuario || selectedActividades.length === 0) {
            alert("Debe seleccionar un usuario y al menos una actividad.");
            return;
        }

        const actividadUsuarioDTO = {
            idDesarrolladorDto: {
                idUsuarioDto: { idDto: selectedUsuario }
            },
            ejecucionDto: ejecucion,
            idActividadEtapaDto: selectedActividades.map(id => ({ idDto: id }))
        };

        try {
            const response = await fetch("http://localhost:8080/actividadUsuario/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actividadUsuarioDTO)
            });

            if (!response.ok) throw new Error(`Error al registrar actividad: ${response.status}`);

            alert("Actividad asignada correctamente");
            setOpen(false);
            onActividadAsignada();
        } catch (error) {
            console.error("Error al registrar actividad:", error);
            alert("Hubo un error al registrar la actividad.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Registrar Actividad para Usuario</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    {/* Seleccionar Usuario */}
                    <label className="block text-sm font-medium dark:text-white">Seleccione un Usuario</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
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

                    {/* Seleccionar Actividades Agrupadas por Etapas */}
                    <label className="block text-sm font-medium dark:text-white">Seleccione Actividades</label>
                    <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                        {etapas.length === 0 ? (
                            <p className="text-gray-500">No hay actividades disponibles</p>
                        ) : (
                            etapas.map((etapa) => (
                                <div key={etapa.idDto} className="mb-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {etapa.nombreEtapaDto}
                                    </h3>
                                    <p className="text-gray-600 text-sm dark:text-gray-400">
                                        {etapa.descripcionEtapaDto}
                                    </p>
                                    <div className="mt-2">
                                        {etapa.actividades.length === 0 ? (
                                            <p className="text-gray-500 text-sm">No hay actividades en esta etapa</p>
                                        ) : (
                                            etapa.actividades.map((actividad) => (
                                                <div key={actividad.idDto} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        value={actividad.idDto}
                                                        checked={selectedActividades.includes(actividad.idDto)}
                                                        onChange={(e) => {
                                                            const id = Number(e.target.value);
                                                            setSelectedActividades((prev) =>
                                                                prev.includes(id)
                                                                    ? prev.filter((a) => a !== id)
                                                                    : [...prev, id]
                                                            );
                                                        }}
                                                    />
                                                    <label className="text-sm dark:text-white">
                                                        {actividad.nombreActividadDto}
                                                    </label>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Campo de ejecución */}
                    <label className="block text-sm font-medium dark:text-white">Ejecutado</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        placeholder="Estado de ejecución"
                        value={ejecucion}
                        onChange={(e) => setEjecucion(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleRegister}>
                    Asignar Actividad
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
