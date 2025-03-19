import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiXCircle } from "react-icons/hi";
import ModalUsuario from "./ModalUsuario";
import { ModalActualizarUsuario } from "./ModalUsuarioActualizar";

interface usuario {
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
};

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedUser, setSelectedUser] = useState<usuario | null>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const r = await fetch("http://localhost:8080/usuario/Consultar",
                    {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",

                        }
                    }
                )
                const data = await r.json();
                setUsuarios(Array.isArray(data) ? data : [data]);

            } catch (e) {
                console.error("Error al cargar los usuarios");
            }

        };
        cargarUsuarios();

    }, []);

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombreDto.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenUpdate = (usuario: usuario) => {
        setSelectedUser(usuario);
        setOpenUpdate(true);
    };

    const handleOpenConfirm = (usuario: usuario) => {
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


    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Usuarios</h2>
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
                    placeholder="Buscar usuario..."
                    className="w-full sm:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {usuariosFiltrados.length === 0 ? (
                <p className="text-center text-gray-500">No hay usuarios disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuariosFiltrados.map((usuario) => (
                        <div key={usuario.idDto} className="p-4 border rounded-lg shadow-sm flex flex-col">
                            <span className="font-semibold">{usuario.nombreDto}</span>
                            <span className="text-gray-500 text-sm">{usuario.correoDto}</span>
                            <div className="flex gap-2 mt-2">
                                <Button color="info" size="xs" onClick={() => handleOpenUpdate(usuario)}>
                                    <HiEye className="w-4 h-4 mr-1" /> Ver
                                </Button>
                                <Button color="failure" size="xs" onClick={() => handleOpenConfirm(usuario)}>
                                    <HiXCircle className="w-4 h-4 mr-1" /> Desactivar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ModalUsuario open={openForm} setOpen={setOpenForm} />

            {selectedUser && <ModalActualizarUsuario open={openUpdate} setOpen={setOpenUpdate} usuario={selectedUser} />}

            <Modal show={openConfirm} onClose={() => setOpenConfirm(false)} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiXCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                        <h3 className="mb-5 text-sm sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Estás seguro de que deseas desactivar a {selectedUser?.nombreDto}?
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
    );
}
