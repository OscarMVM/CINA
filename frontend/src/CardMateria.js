import { useState } from 'react';

const calcularPorcentaje = (valor, min, max) => {
    if (!valor || !min || !max || min === max) return 50; // Valor por defecto
    const porcentaje = ((valor - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, porcentaje));
};

const obtenerColor = (porcentaje) => {
    if (porcentaje < 30) return 'bg-red-400';
    if (porcentaje < 70) return 'bg-yellow-400';
    return 'bg-green-500';
};

function CardMateria({ materia }) {

    // Estados para controlar qué secciones están abiertas
    const [seccionesAbiertas, setSeccionesAbiertas] = useState({
        nutrientes: false,
        minerales: false,
        energia: false,
        micotoxinas: false,
        otros: false
    });
    
    // Estado para controlar el modal
    const [modalAbierto, setModalAbierto] = useState(false);

    // Función para alternar una sección específica
    const alternarSeccion = (seccion) => {
        setSeccionesAbiertas(prev => ({
            ...prev,
            [seccion]: !prev[seccion]
        }));
    };

    return (
        
        <div className="bg-[#434343]/10 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100 p-6 h-fit">
            {/* Información básica del materia */}
            <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                {materia.ingrediente}
            </h3>

            <p className="text-sm font-medium text-[#77AD94] italic mb-3">
                {materia.nombre_cientifico}
            </p>

            <p className="text-sm text-[#F1E8E1] leading-relaxed">
                {materia.descripcion.length > 120
                    ? materia.descripcion.substring(0, 120) + '...'
                    : materia.descripcion
                }
            </p>

            {/* Secciones desplegables */}
            <div className="mt-6 space-y-3">
                <SeccionDesplegable
                    titulo="Nutrientes"
                    datos={materia.nutrientes}
                    abierta={seccionesAbiertas.nutrientes}
                    alternarSeccion={() => alternarSeccion('nutrientes')}
                />

                <SeccionDesplegable
                    titulo="Minerales"
                    datos={materia.minerales}
                    abierta={seccionesAbiertas.minerales}
                    alternarSeccion={() => alternarSeccion('minerales')}
                />

                <SeccionDesplegable
                    titulo="Energía"
                    datos={materia.energia}
                    abierta={seccionesAbiertas.energia}
                    alternarSeccion={() => alternarSeccion('energia')}
                />

                {materia.micotoxinas && (
                    <SeccionDesplegable
                        titulo="Micotoxinas"
                        datos={materia.micotoxinas}
                        abierta={seccionesAbiertas.micotoxinas}
                        alternarSeccion={() => alternarSeccion('micotoxinas')}
                    />
                )}

                {materia.otros && (
                    <SeccionDesplegable
                        titulo="Otros"
                        datos={materia.otros}
                        abierta={seccionesAbiertas.otros}
                        alternarSeccion={() => alternarSeccion('otros')}
                    />
                )}
            </div>
            
            {/* Botón para abrir modal */}
            <div className="mt-6 pt-4 border-t border-green-100">
                <button
                    onClick={() => setModalAbierto(true)}
                    className="w-full bg-[#20C997] hover:bg-[#10674D] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    Ver Datos Completos
                </button>
            </div>
            
            {/* Modal */}
            {modalAbierto && <ModalDatos materia={materia} onClose={() => setModalAbierto(false)} />}
        </div>
    );
}

// Componente para mostrar datos en una sección desplegable
function SeccionDesplegable({ titulo, datos, abierta, alternarSeccion }) {
    return (
        <div className="mb-3">
            <button
                onClick={alternarSeccion}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left font-medium text-sm flex justify-between items-center
                    ${abierta
                        ? 'bg-[#77AD94] border-green-300 text-white shadow-sm'
                        : 'bg-[#353B3D] border-green-200 text-white hover:bg-green-50 hover:text-[#353B3D] hover:border-green-300'
                    }`}
            >
                <span>{titulo}</span>
                <div className={`transform transition-all duration-300 ${abierta ? 'rotate-180' : 'rotate-0'}`}>
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </div>
            </button>

            {abierta && (
                <div className="mt-2 bg-[#353B3D] border-2 border-green-200 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(datos).map(([nombre, info]) => (
                            <div key={nombre} className="bg-white rounded-xl border border-green-200 p-4 hover:shadow-md transition-shadow duration-200">
                                <h5 className="text-sm font-semibold text-green-800 mb-3 leading-tight">
                                    {nombre}
                                </h5>
                                <div className="space-y-2 text-xs text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Muestras:</span>
                                        <span className="font-medium">{info.muestras}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Promedio:</span>
                                        <span className="font-medium text-green-700">{info.promedio_base_seca || info.promedio}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Máx:</span>
                                        <span className="font-medium">{info.maximo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Mín:</span>
                                        <span className="font-medium">{info.minimo}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente Modal para mostrar datos completos
function ModalDatos({ materia, onClose }) {
    const [tabActiva, setTabActiva] = useState('nutrientes');

    const tabs = [
        { id: 'nutrientes', nombre: 'Nutrientes', datos: materia.nutrientes },
        { id: 'minerales', nombre: 'Minerales', datos: materia.minerales },
        { id: 'energia', nombre: 'Energía', datos: materia.energia },
        { id: 'micotoxinas', nombre: 'Micotoxinas', datos: materia.micotoxinas },
        { id: 'otros', nombre: 'Otros', datos: materia.otros }
    ].filter(tab => tab.datos && Object.keys(tab.datos).length > 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-[#1D1D1D] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header del modal */}
                <div className="bg-[#20C997] text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{materia.ingrediente}</h2>
                        <p className="text-green-100 italic">{materia.nombre_cientifico}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-green-100 transition-colors p-2 rounded-full hover:bg-green-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {/* Descripción */}
                <div className="p-6 border-b border-gray-200">
                    <p className="text-[#F1E8E1] leading-relaxed">{materia.descripcion}</p>
                </div>
                
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex space-x-1 p-2 bg-[#2D2D2D]">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setTabActiva(tab.id)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                    tabActiva === tab.id
                                        ? 'bg-[#77AD94] text-white'
                                        : 'text-[#77AD94] hover:text-green-600 hover:bg-green-50'
                                }`}
                            >
                                {tab.nombre}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Contenido de la tabla */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                    <TablaCompleta datos={tabs.find(tab => tab.id === tabActiva)?.datos || {}} />
                </div>
            </div>
        </div>
    );
}

// Componente para mostrar tabla completa de datos
function TablaCompleta({ datos }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#20C997]">
                        <th className="text-left p-3 font-semibold text-white border border-white">Parámetro</th>
                        <th className="text-center p-3 font-semibold text-white border border-white">Muestras</th>
                        <th className="text-center p-3 font-semibold text-white border border-white">Mínimo</th>
                        <th className="text-center p-3 font-semibold text-white border border-white">Promedio</th>
                        <th className="text-center p-3 font-semibold text-white border border-white">Máximo</th>
                        <th className="text-center p-3 font-semibold text-white border border-white">CV (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(datos).map(([nombre, info], index) => (
                        <tr key={nombre} className={index % 2 === 0 ? 'bg-[#707070]' : 'bg-[#535353]'}>
                            <td className="p-3 font-medium text-white border border-gray-200">{nombre}</td>
                            <td className="p-3 text-center text-white border border-gray-200">{info.muestras || 'N/A'}</td>
                            <td className="p-3 text-center text-white border border-gray-200">{info.minimo || 'N/A'}</td>
                            <td className="p-3 text-center font-semibold text-[#20C997] border border-gray-200">
                                {info.promedio_base_seca || info.promedio || 'N/A'}
                            </td>
                            <td className="p-3 text-center text-white border border-gray-200">{info.maximo || 'N/A'}</td>
                            <td className="p-3 text-center text-white border border-gray-200">{info.cv || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CardMateria;