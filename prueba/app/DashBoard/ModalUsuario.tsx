import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface UsuarioFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ModalUsuario({ open, setOpen }: UsuarioFormProps) {
    const [usuario, setUsuario] = useState({
        nombreDto: "",
        apellidoDto: "",
        correoDto: "",
        contrasenaDto: "",
        fechaNacimientoDto: "",
        documentoDto: "",
        direccionDto: "",
        profesionDto: "",
        especialidadDto: "",
        estadoDto: 1,
        rolDto: { idDto: "" },
    });

    const campos = [
        { name: "nombreDto", label: "Nombre", type: "text", required: true },
        { name: "apellidoDto", label: "Apellido", type: "text", required: true },
        { name: "correoDto", label: "Correo Electrónico", type: "email", required: true },
        { name: "contrasenaDto", label: "Contraseña", type: "password", required: true },
        { name: "fechaNacimientoDto", label: "Fecha de Nacimiento", type: "date", required: true },
        { name: "documentoDto", label: "Número de Documento", type: "number", required: true },
        { name: "direccionDto", label: "Dirección", type: "text", required: true },
        { name: "profesionDto", label: "Profesión", type: "text", required: true },
        { name: "especialidadDto", label: "Especialidad", type: "text", required: false },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("rolDto")) {
            setUsuario((prev) => ({
                ...prev,
                rolDto: { ...prev.rolDto, [name.split(".")[1]]: value },
            }));
        } else {
            setUsuario((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Enviando datos:", usuario);

        try {
            const response = await fetch("http://localhost:8080/usuario/Guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario),
            });

            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);

            alert("Usuario creado correctamente");
            setOpen(false);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert("Hubo un error al enviar los datos.");
        }
    };

    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Registrar Usuario</Modal.Header>
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {campos.map(({ name, label, type, required }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium dark:text-white">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={(usuario as any)[name]}
                                onChange={handleChange}
                                required={required}
                                placeholder={name.replace("Dto", "")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium dark:text-white">Rol</label>
                        <select
                            name="rolDto.idDto"
                            value={usuario.rolDto.idDto}
                            onChange={handleChange}
                            title="rol"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            required
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="1">Administrador</option>
                            <option value="2">Líder de Proyecto</option>
                            <option value="3">Programador</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full">Registrar Usuario</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
