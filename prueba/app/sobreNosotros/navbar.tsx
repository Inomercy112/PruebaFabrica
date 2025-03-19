"use client";
import { DarkThemeToggle, Navbar } from "flowbite-react";

import Link from "next/link";
import { useState } from "react";
import MyModal from "./Modal";
import ModalPreguntas from "./ModalPreguntas";
export default function MyBar() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalPreguntas, setOpenModalPreguntas] = useState(false);

    return (
        <>
            <Navbar fluid rounded className="h-20 p-4 fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-gray-900">
                <Link href="/" passHref legacyBehavior>
                    <Navbar.Brand>
                        <img
                            src="/images/logo.png"
                            className="mr-3 h-6 sm:h-9"
                            alt="Kernel Soluciones Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Kernel Soluciones
                        </span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle className="focus:outline-none" />
                <Navbar.Collapse className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 md:relative md:top-0 md:w-auto">
                    <Link href="#about" passHref legacyBehavior>
                        <Navbar.Link>Nosotros</Navbar.Link>
                    </Link>
                    <Link href="#services" passHref legacyBehavior>
                        <Navbar.Link>Servicios</Navbar.Link>
                    </Link>
                    <Link href="#prices" passHref legacyBehavior>
                        <Navbar.Link>Precios</Navbar.Link>
                    </Link>
                    <Link href="#contact" passHref legacyBehavior>
                        <Navbar.Link>Contacto</Navbar.Link>
                    </Link>

                    <Navbar.Link onClick={() => setOpenModalPreguntas(true)}>
                        Preguntas Comunes
                    </Navbar.Link>

                    <Navbar.Link onClick={() => setOpenModal(true)}>Login</Navbar.Link>
                </Navbar.Collapse>

                <DarkThemeToggle />
            </Navbar>

            <MyModal open={openModal} setOpen={setOpenModal} />
            <ModalPreguntas open={openModalPreguntas} setOpen={setOpenModalPreguntas} />
        </>
    );

}
