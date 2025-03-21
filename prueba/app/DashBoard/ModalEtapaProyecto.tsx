'use client';
import { Button, Modal } from "flowbite-react";

interface Etapa {
    idDto: number;
    nombreEtapaDto: string;
    descripcionEtapaDto: string;
}

interface Actividad {
    idDto: number;
    nombreActividadDto: string;
    descripcionActividadDto: string;
    estadoActividadDto: number;
    ejecucionDto?: string;
    etapaDto: Etapa;
}

interface EtapaProyecto {
    idDto: number;
    proyectoDto: number;
    nombreProyectoDto?: string | null;
    etapaDto?: Etapa;
    fechaInicio: string;
    fechaFin: string;
    actividadDto: Actividad[];
}

interface ModalVerEtapasProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    actividades: Actividad[];
    proyectoNombre?: string;
    etapas: EtapaProyecto[]
}

export default function ModalVerEtapas({
    open,
    setOpen,
    etapas,
    proyectoNombre,
}: ModalVerEtapasProps) {
    console.log(etapas)

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header className="dark:bg-gray-900 dark:text-white">
                Etapas de {proyectoNombre}
            </Modal.Header>
            <Modal.Body className="dark:bg-gray-900">
                {etapas.length === 0 ? (
                    <p className="text-gray-500 text-center dark:text-gray-400">
                        No hay actividades registradas en este proyecto.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {etapas.map((etapa) => (
                            <li key={etapa.idDto} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                                {etapa.etapaDto ? (
                                    <>
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            {etapa.etapaDto.nombreEtapaDto}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">{etapa.etapaDto.descripcionEtapaDto}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No hay información de etapa disponible.</p>
                                )}

                                {etapa.actividadDto.length > 0 ? (
                                    <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded-lg border dark:border-gray-700">
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                                            Actividades:
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                            {etapa.actividadDto.map((actividad) => (
                                                <li key={actividad.idDto} className="ml-4">
                                                    <span className="font-medium dark:text-white">
                                                        {actividad.nombreActividadDto}:
                                                    </span>{" "}
                                                    {actividad.descripcionActividadDto}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        No hay actividades registradas en esta etapa.
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Modal.Body>
            <Modal.Footer className="dark:bg-gray-900">
                <Button color="gray" onClick={() => setOpen(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}