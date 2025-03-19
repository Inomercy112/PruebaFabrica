"use client";
import { Button, DarkThemeToggle, Sidebar } from "flowbite-react";
import { useState } from "react";
import { MyFooter } from "../sobreNosotros/footer";
import Proyectos from "./Proyectos";
import Usuarios from "./Usuarios";
export default function Dashboard() {
    const [vista, setVista] = useState<"usuarios" | "proyectos">("usuarios");

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <Sidebar
                    aria-label="Sidebar con navegación"
                    className="flex flex-col w-64 h-screen bg-gray-800 dark:bg-gray-800"
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Button onClick={() => setVista("usuarios")} className="w-full text-left">
                                Usuarios
                            </Button>
                            <Button onClick={() => setVista("proyectos")} className="w-full text-left">
                                Proyectos
                            </Button>
                            <DarkThemeToggle />
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

                <main className="flex-1 p-6 overflow-auto">
                    {vista === "usuarios" && <Usuarios />}
                    {vista === "proyectos" && <Proyectos />}
                </main>
            </div>

            <MyFooter />
        </div>
    );





}
