import { Button, DarkThemeToggle, Sidebar } from "flowbite-react";
import { HiUsers, HiOutlineFolder, HiOutlineClipboardList, HiOutlineLogout } from "react-icons/hi";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardSidebar({ user, handleLogout }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentVista = searchParams.get("vista") || "proyecto";

    const cambiarVista = (nuevaVista) => {
        if (nuevaVista !== currentVista) {
            router.replace(`/DashBoard?vista=${nuevaVista}`);
        }
    };

    return (
        <Sidebar aria-label="Sidebar de navegación" className="w-64 h-screen bg-gray-800  dark:bg-gray-900 ">
            <div className="p-4 text-center border-b border-gray-700">
                {user ? (
                    <>
                        <h2 className="text-lg font-semibold  dark:text-white">
                            Bienvenido, {user.nombreDto} {user.apellidoDto}
                        </h2>
                        <p className="text-sm font-semibold mb-4 dark:text-white">{user.rolDto.nombreRol}</p>
                    </>
                ) : (
                    <p className="text-gray-400">Cargando...</p>
                )}
            </div>

            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {user?.rolDto.idDto === 1 && (
                        <Button
                            onClick={() => cambiarVista("usuarios")}
                            className={`w-full flex items-center gap-2 p-3 hover:bg-gray-700 ${
                                currentVista === "usuarios" ? "bg-gray-700" : ""
                            }`}
                        >
                            <HiUsers className="text-lg" /> Usuarios
                        </Button>
                    )}

                    {(user?.rolDto.idDto === 1 || user?.rolDto.idDto === 2) && (
                        <>
                            <Button
                                onClick={() => cambiarVista("proyectos")}
                                className={`w-full flex items-center gap-2 p-3 hover:bg-gray-700 ${
                                    currentVista === "proyectos" ? "bg-gray-700" : ""
                                }`}
                            >
                                <HiOutlineFolder className="text-lg" /> Proyectos
                            </Button>

                            <Button
                                onClick={() => cambiarVista("etapas")}
                                className={`w-full flex items-center gap-2 p-3 hover:bg-gray-700 ${
                                    currentVista === "etapas" ? "bg-gray-700" : ""
                                }`}
                            >
                                <HiOutlineClipboardList className="text-lg" /> Etapas
                            </Button>
                        </>
                    )}

                    {(user?.rolDto.idDto === 2 || user?.rolDto.idDto === 3) && (
                        <Button
                            onClick={() => cambiarVista("actividad")}
                            className={`w-full flex items-center gap-2 p-3 hover:bg-gray-700 ${
                                currentVista === "actividad" ? "bg-gray-700" : ""
                            }`}
                        >
                            <HiOutlineClipboardList className="text-lg" /> Actividades
                        </Button>
                    )}

                    <div className="mt-4 space-y-2">
                        <DarkThemeToggle />
                        <Button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <HiOutlineLogout className="text-lg" /> Cerrar Sesión
                        </Button>
                    </div>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
