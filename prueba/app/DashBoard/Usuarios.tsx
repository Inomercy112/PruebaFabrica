import { useEffect, useState } from "react";
import ModalUsuario from "./ModalUsuario";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [openForm, setOpenForm] = useState(false);
    useEffect( ()=>{
        const cargarUsuarios = async() =>{
            try{
                const r = await fetch("http://localhost:8080/usuario/Consultar",
                    {
                        method:"GET",
                        headers:{
                            "Content-type" : "application/json",
                            
                        }
                    }
                )
                const data = await r.json();
                setUsuarios(Array.isArray(data) ? data : [data]);

            }catch(e){
                console.error("Error al cargar los usuarios");
            }

        };
        cargarUsuarios();

    }, []);

    return (
        <>
        <button onClick={() => setOpenForm(true)}>Nuevo Usuario</button>
        <ModalUsuario open={openForm} setOpen={setOpenForm} />

        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

            {usuarios.length === 0 ? (
                <p>No hay usuarios disponibles.</p>
            ) : (
                <ul className="space-y-2">
                    {usuarios.map((usuario, index) => (
                        <li key={index} className="p-2 border rounded">
                            {usuario.nombreDto} - {usuario.correoDto}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}
