import { MyFooter } from "./footer";
import MyBar from "./navbar";

export default function Vista() {
    return (
        <div className="flex flex-col min-h-screen">
            <MyBar />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
                    Bienvenido a iKernel Soluciones
                </h1>


                <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between h-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">Nosotros</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            En <span className="font-semibold text-blue-600 dark:text-blue-400">iKernel Soluciones</span>, nos especializamos en el desarrollo de software a medida para empresas que buscan optimizar sus procesos y potenciar su crecimiento.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center h-full">
                        <img
                            src="/images/equipoTrabajo.jpg"
                            alt="Equipo de trabajo en iKernel Soluciones"
                            className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
                        />
                    </div>
                </div>

                <div id="services" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center h-full">
                        <img
                            src="/images/lenguajes.jpeg"
                            alt="Nuestros Servicios"
                            className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
                        />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between h-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">Servicios</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            Ofrecemos desarrollo de software, consultoría tecnológica y mantenimiento de sistemas, adaptándonos a las necesidades específicas de tu negocio.
                        </p>
                    </div>
                </div>


                <div id="prices" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between h-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">Precios</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            Contamos con planes flexibles y accesibles según el tamaño de tu empresa. ¡Solicita una cotización personalizada!
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center h-full">
                        <img
                            src="/images/precio.png"
                            alt="Planes y Precios"
                            className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
                        />
                    </div>
                </div>


                <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center h-full">
                        <img
                            src="/images/correo.png"
                            alt="Contáctanos"
                            className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
                        />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between h-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">Contacto</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            ¿Tienes dudas? ¡Contáctanos! Estamos disponibles para asesorarte y brindarte la mejor solución para tu empresa.
                        </p>
                    </div>
                </div>
            </div>

            <MyFooter />
        </div>
    );
}
