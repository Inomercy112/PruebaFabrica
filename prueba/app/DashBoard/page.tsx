"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProyectoDetalle from "../proyecto/[id]/page";
import { MyFooter } from "../sobreNosotros/footer";
import ActividadUsuarioPage from "./Actividad";
import DashboardSidebar from "./DashboardSidebar";
import Etapas from "./Etapas";
import Proyectos from "./Proyectos";
import Usuarios from "./Usuarios";

interface Usuario {
    idDto: number;
    nombreDto: string;
    apellidoDto: string;
    rolDto: {
        idDto: number
    }
}


export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [vista, setVista] = useState(searchParams.get("vista") || "usuarios");
    const [user, setUser] = useState<Usuario | null>(null);
    const proyectoId = searchParams.get("id");

    useEffect(() => {
        setVista(searchParams.get("vista") || "proyectos");
    }, [searchParams]);

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
            <div className="flex bg-gray-100 dark:bg-gray-900">
                <DashboardSidebar user={user} handleLogout={handleLogout} />

                <main className="flex-1 p-6 overflow-auto">
                    {proyectoId ? (
                        <ProyectoDetalle id={proyectoId} />
                    ) : (
                        <>
                            {vista === "usuarios" && user?.rolDto.idDto === 1 && <Usuarios />}
                            {vista === "etapas" && (user?.rolDto.idDto === 2 || user?.rolDto.idDto === 1) && <Etapas />}
                            {vista === "proyectos" && (user?.rolDto.idDto === 2 || user?.rolDto.idDto === 1) && <Proyectos />}
                            {vista === "actividad" && (user?.rolDto.idDto === 3 || user?.rolDto.idDto === 2) && <ActividadUsuarioPage />}
                        </>
                    )}
                </main>
            </div>
            <MyFooter />
        </div>
    );
}
