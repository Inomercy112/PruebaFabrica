import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface FAQModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface Pregunta {
    idDto?: number;
    preguntaDto: string;
    respuestaDto?: string;
}

export default function ModalPreguntas({ open, setOpen }: FAQModalProps) {
    const [search, setSearch] = useState("");
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [loading, setLoading] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensajeExito, setMensajeExito] = useState("");

    const [nuevaPregunta, setNuevaPregunta] = useState<Pregunta>({ preguntaDto: "" });

    useEffect(() => {
        if (open) {
            const cargarPreguntas = async () => {
                setLoading(true);
                try {
                    const r = await fetch("http://localhost:8080/pregunta/Consultar", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!r.ok) {
                        throw new Error(`Error en la respuesta: ${r.status}`);
                    }

                    const data = await r.json();
                    setPreguntas(Array.isArray(data) ? data : [data]);
                } catch (error) {
                    console.error("Error al cargar las preguntas:", error);
                } finally {
                    setLoading(false);
                }
            };

            cargarPreguntas();
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNuevaPregunta((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nuevaPregunta.preguntaDto.trim()) {
            alert("Por favor, escribe una pregunta.");
            return;
        }

        setGuardando(true);

        try {
            const response = await fetch("http://localhost:8080/pregunta/Guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaPregunta),
            });

            if (response.ok) {
                setNuevaPregunta({ preguntaDto: "" });

                setMensajeExito("Tu pregunta ha sido registrada correctamente.");

                setTimeout(() => setMensajeExito(""), 3000);
            } else {
                throw new Error(`Error al registrar pregunta: ${response.status}`);
            }
        } catch (error) {
            console.error("Error al registrar la pregunta:", error);
            alert("Hubo un error al registrar la pregunta.");
        } finally {
            setGuardando(false);
        }
    };

    const preguntasFiltradas = preguntas.filter((faq) =>
        faq.preguntaDto.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (preguntasFiltradas.length === 0) {
            setTimeout(() => setMostrarFormulario(true), 300);
        } else {
            setMostrarFormulario(false);
        }
    }, [preguntasFiltradas]);

    useEffect(() => {
        if (!open) {
            setSearch("");
        }
    }, [open]);

    return (
        <Modal show={open} onClose={() => setOpen(false)} dismissible={true}>
            <Modal.Header>Preguntas Frecuentes</Modal.Header>
            <Modal.Body>
                {mensajeExito && (
                    <Alert color="success" className="mb-4">
                        {mensajeExito}
                    </Alert>
                )}

                <input
                    type="text"
                    placeholder="Buscar pregunta..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />

                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">Cargando preguntas...</p>
                ) : (
                    <div className="space-y-4">
                        {preguntasFiltradas.length > 0 ? (
                            preguntasFiltradas.map((faq) => (
                                <div
                                    key={faq.idDto}
                                    className="p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-all duration-300"
                                >
                                    <h3 className="font-semibold">{faq.preguntaDto}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{faq.respuestaDto}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">
                                No se encontraron preguntas.
                            </p>
                        )}
                    </div>
                )}

                <div className={`mt-6 p-4 border-t transition-all duration-300 ${mostrarFormulario ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <h3 className="text-lg font-semibold dark:text-white">Registra tu pregunta!</h3>
                    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium dark:text-white">Pregunta</label>
                            <input
                                type="text"
                                name="preguntaDto"
                                value={nuevaPregunta.preguntaDto}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                required
                                placeholder="Escriba su pregunta"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={guardando}>
                            {guardando ? "Guardando..." : "Registrar Pregunta"}
                        </Button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
