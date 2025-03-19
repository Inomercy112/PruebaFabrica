import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface MyModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function MyModal({ open, setOpen }: MyModalProps) {
    const router = useRouter(); 
        const [formulario,setFormulario] = useState({
            correo:"",
            contrasena:""
        });
        const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) =>{
            const {name, value} = e.target;
            setFormulario((prevState) =>({
                ...prevState,
                [name] : value,
            }));
        };
        const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();

    
            try{
                const r = await fetch("http://localhost:8080/usuario/Login",{
                    method: "POST",
                    headers :{
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(formulario)
                }
                )
                if(r.ok){
                    const data = await r.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    router.push("/DashBoard");
        
                }else{
                    alert("no se pudo iniciar sesion");
                }
            }catch(e){
                alert("e");
            }
        }
    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Header>Iniciar Sesión</Modal.Header>
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tu correo"
                            name="correo"
                            value={formulario.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            name="contrasena"
                            value={formulario.contrasena}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" className="w-full" >Iniciar Sesión</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}