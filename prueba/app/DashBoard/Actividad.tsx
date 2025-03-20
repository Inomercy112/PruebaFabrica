import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
}

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
}

interface ActividadUsuario {
    idDto: number;
    idDesarrolladorDto: {
        idDto: number;
        idUsuarioDto: Usuario;
        idProyectoDto: Proyecto;
    };
    idActividadEtapaDto: Actividad[];
    ejecucionDto: string;
}

interface ModalVerActividadUsuarioProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    actividadUsuarioId: number;
}

export default function ModalVerActividadUsuario({ open, setOpen, actividadUsuarioId }: ModalVerActividadUsuarioProps) {
    const [actividadUsuario, setActividadUsuario] = useState<ActividadUsuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open && actividadUsuarioId) {
            fetch(`http://localhost:8080/actividadUsuario/Consultar/${actividadUsuarioId}`)
                .then((res) => res.json())
                .then((data) => {
                    setActividadUsuario(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener la actividad del usuario:", error);
                    setLoading(false);
                });
        }
    }, [open, actividadUsuarioId]);

    return (
        <Modal show={open} onClose={() => setOpen(false)} size="lg">
            <Modal.Header>Detalles de Actividad del Usuario</Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p className="text-center text-gray-500">Cargando...</p>
                ) : actividadUsuario ? (
                    <div className="space-y-4">
                        {/* Datos del Usuario */}
                        <div className="p-4 bg-gray-50 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-900">Usuario</h3>
                            <p className="text-gray-700">
                                <strong>Nombre:</strong> {actividadUsuario.idDesarrolladorDto.idUsuarioDto.nombreDto}{" "}
                                {actividadUsuario.idDesarrolladorDto.idUsuarioDto.apellidoDto}
                            </p>
                        </div>

                        {/* Datos del Proyecto */}
                        <div className="p-4 bg-gray-50 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-900">Proyecto</h3>
                            <p className="text-gray-700"><strong>Nombre:</strong> {actividadUsuario.idDesarrolladorDto.idProyectoDto.nombreDto}</p>
                            <p className="text-gray-700"><strong>Estado:</strong> {actividadUsuario.idDesarrolladorDto.idProyectoDto.estadoProyectoDto.nombreEstadoDto}</p>
                            <p className="text-gray-700"><strong>Tipo:</strong> {actividadUsuario.idDesarrolladorDto.idProyectoDto.tipoProyectoDto.nombreTipoProyectoDto}</p>
                        </div>

                        {/* Actividades Asignadas */}
                        <div className="p-4 bg-gray-50 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-900">Actividades</h3>
                            {actividadUsuario.idActividadEtapaDto.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {actividadUsuario.idActividadEtapaDto.map((actividad) => (
                                        <li key={actividad.idDto} className="p-2 border-b">
                                            <strong>{actividad.nombreActividadDto}:</strong> {actividad.descripcionActividadDto}
                                            <p className="text-sm text-gray-600 mt-1">
                                                <strong>Etapa:</strong> {actividad.etapaDto.nombreEtapaDto} - {actividad.etapaDto.descripcionEtapaDto}
                                            </p>
                                            <p className={`text-xs font-semibold inline-block px-2 py-1 rounded-full mt-1 ${
                                                actividad.estadoActividadDto === 1 ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                            }`}>
                                                {actividad.estadoActividadDto === 1 ? "Completada" : "Pendiente"}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No hay actividades asignadas.</p>
                            )}
                        </div>

                        {/* Ejecución */}
                        <div className="p-4 bg-gray-50 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-900">Ejecución</h3>
                            <p className="text-gray-700">{actividadUsuario.ejecucionDto || "No especificado"}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No se encontraron datos.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={() => setOpen(false)}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
