import { Button, Modal } from "flowbite-react";

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
    fechaInicio: string;
    fechaFin: string;
    actividades: Actividad[];
}

interface ModalVerEtapasProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    etapasAsignadas: Etapa[];
    proyectoNombre?: string;
}

export default function ModalVerEtapas({
    open,
    setOpen,
    etapasAsignadas,
    proyectoNombre,
}: ModalVerEtapasProps) {
    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Etapas de {proyectoNombre}</Modal.Header>
            <Modal.Body>
                {etapasAsignadas.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No hay etapas asignadas a este proyecto.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {etapasAsignadas.map((etapa) => (
                            <li key={etapa.idDto} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg text-gray-900">
                                    {etapa.nombreEtapaDto}
                                </h3>
                                <p className="text-gray-700">{etapa.descripcionEtapaDto}</p>

                                {/* Fechas */}
                                <p className="text-sm text-gray-600 mt-1">
                                    Inicio: {new Date(etapa.fechaInicio).toLocaleDateString("es-ES")}
                                    {" - "}
                                    Fin: {new Date(etapa.fechaFin).toLocaleDateString("es-ES")}
                                </p>

                                {/* Mostrar actividades */}
                                {etapa.actividades.length > 0 ? (
                                    <div className="mt-3 bg-white p-3 rounded-lg border">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                            Actividades:
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700">
                                            {etapa.actividades.map((actividad) => (
                                                <li key={actividad.idDto} className="ml-4">
                                                    <span className="font-medium">
                                                        {actividad.nombreActividadDto}:
                                                    </span>{" "}
                                                    {actividad.descripcionActividadDto}
                                                    <span
                                                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${actividad.estadoActividadDto === 0
                                                                ? "bg-yellow-200 text-yellow-800"
                                                                : "bg-green-200 text-green-800"
                                                            }`}
                                                    >
                                                        {actividad.estadoActividadDto === 0
                                                            ? "Pendiente"
                                                            : "Completado"}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-2">
                                        No hay actividades registradas en esta etapa.
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
