import { useState, useEffect } from 'react';
import { obtenerMaterias } from './servicios';
import CardMateria from './CardMateria';

function Cina() {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(null);

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const datosObtenidos = await obtenerMaterias();
            setDatos(datosObtenidos);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
        setCargando(false);
    };

    // Función para filtrar datos según búsqueda
    const filtrarDatos = (datos, texto) => {
        if (!texto.trim()) return datos;
        
        return datos.filter(materia => 
            materia.ingrediente?.toLowerCase().includes(texto.toLowerCase()) ||
            materia.nombre_cientifico?.toLowerCase().includes(texto.toLowerCase()) ||
            materia.descripcion?.toLowerCase().includes(texto.toLowerCase())
        );
    };

    // Función para manejar cambios en la búsqueda
    const manejarBusqueda = (evento) => {
        const nuevoTexto = evento.target.value;
        setTextoBusqueda(nuevoTexto);
        
        if (datos) {
            const filtrados = filtrarDatos(datos, nuevoTexto);
            setDatosFiltrados(filtrados);
        }
    };

    // Función para limpiar búsqueda
    const limpiarBusqueda = () => {
        setTextoBusqueda('');
        setDatosFiltrados(datos);
    };

    // useEffect para cargar datos automáticamente al entrar a la ruta
    useEffect(() => {
        cargarDatos();
    }, []);

    // Actualizar filtros cuando cambien los datos
    useEffect(() => {
        if (datos) {
            const filtrados = filtrarDatos(datos, textoBusqueda);
            setDatosFiltrados(filtrados);
        }
    }, [datos, textoBusqueda]);

    return (
        <div className='min-h-screen bg-[#254E48]'>
            {/* Header con título y búsqueda */}
            <div className="text-center mb-8">
                <h1 className='text-4xl font-bold text-white mb-2'>
                    CINA
                </h1>
                <p className='text-xl text-white mb-6 font-medium'> 
                    Composición de materias primas usadas en alimentos para animales
                </p>
                
                {/* Barra de búsqueda Material Design 3 */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar ingredientes, nombres científicos o descripciones..."
                            value={textoBusqueda}
                            onChange={manejarBusqueda}
                            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-green-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                        />
                        {textoBusqueda && (
                            <button
                                onClick={limpiarBusqueda}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Indicador de resultados */}
                    {datos && datosFiltrados && textoBusqueda && (
                        <div className="mt-3 text-sm text-gray-600">
                            <span>
                                Mostrando <span className="font-semibold text-green-700">{datosFiltrados.length}</span> de <span className="font-semibold">{datos.length}</span> ingredientes
                                {datosFiltrados.length === 0 && (
                                    <span className="block mt-1 text-gray-500">No se encontraron resultados para "<span className="font-medium">{textoBusqueda}</span>"</span>
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            
            {cargando && (
                <div className='flex justify-center items-center py-16'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4'></div>
                        <p className="text-lg text-gray-700">Cargando datos de ingredientes...</p>
                    </div>
                </div>
            )}
            
            {datos && !cargando && (
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
                        {(datosFiltrados || datos).map((materia, index) => (
                            <CardMateria 
                                key={materia.id || index}
                                materia={materia}
                            />
                        ))}
                    </div>
                    
                    {/* Mensaje cuando no hay resultados */}
                    {datosFiltrados && datosFiltrados.length === 0 && textoBusqueda && (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 max-w-md mx-auto">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                                <p className="text-gray-500 mb-4">Intenta con otros términos de búsqueda</p>
                                <button
                                    onClick={limpiarBusqueda}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Ver todos los ingredientes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cina;