import { MyFooter } from "./footer";
import MyBar from "./navbar";

export default function Vista() {
    return (
        <>
            <MyBar />

            {/* Contenedor principal con dos columnas */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Primera columna */}
                    <div id="about" className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Nosotros</h2>
                        <p className="text-gray-600">En iKernel Soluciones, nos especializamos en el desarrollo de software a medida para empresas que buscan optimizar sus procesos y potenciar su crecimiento. Nuestro equipo de expertos en tecnología trabaja con las últimas tendencias en desarrollo para ofrecer soluciones innovadoras, seguras y escalables.</p>

                    </div>

                    {/* Segunda columna */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-600">imagen</p>
                    </div>

                </div>
            </div>

            <MyFooter />
        </>
    );
}
