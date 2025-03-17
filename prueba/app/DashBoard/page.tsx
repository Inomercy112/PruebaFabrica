"use client";
import { useState } from "react";
import { Sidebar, Button } from "flowbite-react";
import Usuarios from "./Usuarios";
import Proyectos from "./Proyectos";
export default function Dashboard() {
    const [vista, setVista] = useState<"usuarios" | "proyectos">("usuarios"); // Estado para cambiar vista

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar aria-label="Sidebar con navegación">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Button onClick={() => setVista("usuarios")} className="w-full text-left">
                            Usuarios
                        </Button>
                        <Button onClick={() => setVista("proyectos")} className="w-full text-left">
                            Proyectos
                        </Button>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            {/* Contenido principal */}
            <main className="flex-1 p-6">
                {vista === "usuarios" && <Usuarios />}
                {vista === "proyectos" && <Proyectos />}
            </main>
        </div>
    );
}
