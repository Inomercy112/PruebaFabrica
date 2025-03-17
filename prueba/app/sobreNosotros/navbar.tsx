"use client";
import { DarkThemeToggle, Navbar } from "flowbite-react";

import { useState } from "react";
import MyModal from "./Modal";
import Link from "next/link";
export default function MyBar() {

    const [openModal, setOpenModal] = useState(false); // Estado del modal

    return (
        <>
            <Navbar fluid rounded className="h-20 p-4">
                <Link href="/" passHref legacyBehavior>
                    <Navbar.Brand>
                        <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="Kernel Soluciones Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Kernel Soluciones
                        </span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Link href="#about" passHref legacyBehavior>
                        <Navbar.Link>Nosotros</Navbar.Link>
                    </Link>
                    <Link href="/servicios" passHref legacyBehavior>
                        <Navbar.Link>Servicios</Navbar.Link>
                    </Link>
                    <Link href="/precios" passHref legacyBehavior>
                        <Navbar.Link>Precios</Navbar.Link>
                    </Link>
                    <Link href="/contacto" passHref legacyBehavior>
                        <Navbar.Link>Contacto</Navbar.Link>
                    </Link>
                    <Link href="/preguntas" passHref legacyBehavior>
                        <Navbar.Link>Preguntas Comunes</Navbar.Link>
                    </Link>
                    <Navbar.Link onClick={() => setOpenModal(true)}>Login</Navbar.Link>
                </Navbar.Collapse>
                <DarkThemeToggle />
            </Navbar>

            {/* Modal de Login */}
            <MyModal open={openModal} setOpen={setOpenModal} />
        </>
    );

}