"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { MyFooter } from "../sobreNosotros/footer";
import Etapas from "./Etapas";
import Proyectos from "./Proyectos";
import Usuarios from "./Usuarios";



export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [vista, setVista] = useState(searchParams.get("vista") || "usuarios");
    const [user, setUser] = useState(null);

    useEffect(() => {
        setVista(searchParams.get("vista") || "usuarios");
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
            <div className="flex flex-1">
                <DashboardSidebar user={user} handleLogout={handleLogout} />

                <main className="flex-1 p-6 overflow-auto">
                    {vista === "usuarios" && user?.rolDto.idDto === 1 && <Usuarios />}
                    {vista === "etapas" && <Etapas />}
                    {vista === "proyectos" && <Proyectos />}
                </main>
            </div>
            <MyFooter />
        </div>
    );
}
