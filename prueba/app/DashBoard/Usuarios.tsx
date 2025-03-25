import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiDownload, HiEye, HiPlus, HiXCircle } from "react-icons/hi";
import ModalUsuario from "./ModalUsuario";
import { ModalActualizarUsuario } from "./ModalUsuarioActualizar";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
    correoDto: string;
    contrasenaDto?: string;
    fechaNacimientoDto: string;
    documentoDto: number;
    direccionDto: string;
    profesionDto: string;
    especialidadDto: string;
    estadoDto: number;
    rolDto: { idDto: number; nombreRol: string };
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [search, setSearch] = useState("");

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:8080/usuario/Consultar");
            if (!response.ok) throw new Error("Error al obtener usuarios");

            const data = await response.json();
            if (Array.isArray(data)) {
                setUsuarios(data);
            } else {
                setUsuarios(data ? [data] : []);
            }
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter(
        (usuario) => usuario.nombreDto?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenUpdate = (usuario: Usuario) => {
        setSelectedUser(usuario);
        setOpenUpdate(true);
    };

    const handleOpenConfirm = (usuario: Usuario) => {
        setSelectedUser(usuario);
        setOpenConfirm(true);
    };

    const handleDesactivarUsuario = async () => {
        if (!selectedUser) return;

        try {
            const usuarioActualizado = { ...selectedUser, estadoDto: 2 };

            const response = await fetch(`http://localhost:8080/usuario/Actualizar/${selectedUser.idDto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioActualizado),
            });

            if (!response.ok) throw new Error(`Error al desactivar usuario: ${response.status}`);

            setUsuarios((prev) =>
                prev.map((u) =>
                    u.idDto === selectedUser.idDto ? usuarioActualizado : u
                )
            );

            alert("Usuario desactivado correctamente");
            setOpenConfirm(false);
        } catch (error) {
            console.error("Error al desactivar usuario:", error);
            alert("Error al desactivar usuario");
        }
    };

    const handleDescargarPDF = async (idUsuario: number) => {
        try {
            const response = await fetch(`http://localhost:8080/reportes/pdf/${idUsuario}`);
            if (!response.ok) throw new Error("Error al generar el PDF");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `reporte_usuario_${idUsuario}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
            alert("No se pudo descargar el reporte PDF");
        }
    };


    return (
        <div className="w-full h-full p-4 sm:p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h2>
                    <button
                        onClick={() => setOpenForm(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <HiPlus className="text-xl" />
                        <span className="hidden sm:inline">Nuevo</span>
                    </button>
                </div>

                {/* Input de búsqueda */}
                <div className="flex justify-center sm:justify-start">
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        className="w-full sm:w-96 px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Lista de usuarios */}
                {usuariosFiltrados.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No hay usuarios disponibles.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {usuariosFiltrados.map((usuario) => (
                            <div key={usuario.idDto} className="p-4 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {usuario.nombreDto} {usuario.apellidoDto}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">{usuario.correoDto}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">{usuario.rolDto.nombreRol}</span>

                                {/* Botones */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Button color="info" size="xs" onClick={() => handleOpenUpdate(usuario)}>
                                        <HiEye className="w-4 h-4 mr-1" /> Ver
                                    </Button>
                                    <Button color="failure" size="xs" onClick={() => handleOpenConfirm(usuario)}>
                                        <HiXCircle className="w-4 h-4 mr-1" /> Desactivar
                                    </Button>
                                    <Button color="success" size="xs" onClick={() => handleDescargarPDF(usuario.idDto)}>
                                        <HiDownload className="w-4 h-4 mr-1" /> PDF
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modales */}
                <ModalUsuario open={openForm} setOpen={setOpenForm} onSuccess={fetchUsuarios} />

                {selectedUser && <ModalActualizarUsuario open={openUpdate} setOpen={setOpenUpdate} usuario={selectedUser} onSuccess={fetchUsuarios} />}

                <Modal show={openConfirm} onClose={() => setOpenConfirm(false)} size="md" popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiXCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                            <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                                ¿Estás seguro de que deseas desactivar a <strong>{selectedUser?.nombreDto}</strong>?
                            </h3>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button color="failure" onClick={handleDesactivarUsuario}>
                                    Sí, desactivar
                                </Button>
                                <Button color="gray" onClick={() => setOpenConfirm(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );

}
