"use client";
import { Button, DarkThemeToggle, Sidebar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MyFooter } from "../sobreNosotros/footer";
import Actividades from "./Actividad";
import Etapas from "./Etapas";
import Proyectos from "./Proyectos";
import Usuarios from "./Usuarios";

export default function Dashboard() {
    const [vista, setVista] = useState<"usuarios" | "proyectos" | "etapas" | "actividad">("usuarios");
    const [user, setUser] = useState<{ apellidoDto: string, nombreDto: string; rolDto: { nombreRol: string, idDto: number } } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/sobreNosotros");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/sobreNosotros");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <Sidebar aria-label="Sidebar con navegación" className="flex flex-col w-64 h-screen bg-gray-800 dark:bg-gray-900 text-white">
                    <div className="p-4 text-center border-b border-gray-700">
                        {user ? (
                            <>
                                <h2 className="text-lg font-semibold">Bienvenido, {user.nombreDto} {user.apellidoDto} </h2>
                                <p className="text-sm text-gray-400">{user.rolDto.nombreRol}</p>
                            </>
                        ) : (
                            <p className="text-gray-400">Cargando...</p>
                        )}
                    </div>

                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {user?.rolDto.idDto === 1 && (
                                <>
                                    <Button onClick={() => setVista("usuarios")} className="w-full text-left">
                                        Usuarios
                                    </Button>
                                </>

                            )
                            }

                            <Button onClick={() => setVista("proyectos")} className="w-full text-left">
                                Proyectos
                            </Button>
                            <Button onClick={() => setVista("etapas")} className="w-full text-left">
                                Etapas de proyecto
                            </Button>
                            <Button onClick={() => setVista("actividad")} className="w-full text-left">
                                Actividades Etapas
                            </Button>

                            <DarkThemeToggle />
                            <Button onClick={handleLogout} className="w-full text-left bg-red-600 text-white mt-4">
                                Cerrar Sesión
                            </Button>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

                <main className="flex-1 p-6 overflow-auto">
                    {user?.rolDto.idDto === 1 ? (
                        vista === "usuarios" ? <Usuarios /> : null
                    ) : (
                        <p> </p>
                    )}
                    {vista === "etapas" && <Etapas />}

                    {vista === "proyectos" && <Proyectos />}
                    {vista === "actividad" && <Actividades />}
                </main>
            </div>

            <MyFooter />
        </div>
    );
}
