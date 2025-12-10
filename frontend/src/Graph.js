import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { obtenerMaterias } from './servicios';

const procesarDatosNutrientes = (materias) => {
    if (!materias || materias.length === 0) return { series: [], categories: [], estadisticas: null };

    let acemiteTrigo = materias.find(m => 
        m.ingrediente && (
            (m.ingrediente.toLowerCase().includes('acemite') && m.ingrediente.toLowerCase().includes('trigo'))
        )
    );
    
    console.log('Datos encontrados:', acemiteTrigo);
    
    if (!acemiteTrigo || !acemiteTrigo.nutrientes) {
        return { series: [], categories: [], estadisticas: null };
    }
    
    const nutrientes = acemiteTrigo.nutrientes;
    
    const nutrientesParaGrafico = [
        { nombre: "Materia seca (%)", datos: nutrientes["Materia seca (%)"] },
        { nombre: "Proteína cruda (%)", datos: nutrientes["Proteína cruda (%)"] },
        { nombre: "Fibra cruda (%)", datos: nutrientes["Fibra cruda (%)"] },
        { nombre: "Extracto etéreo (%)", datos: nutrientes["Extracto etéreo (%)"] }
    ];
    
    const nutrientesConDatos = nutrientesParaGrafico.filter(n => n.datos && n.datos.muestras > 0);
    
    if (nutrientesConDatos.length === 0) {
        return { series: [], categories: [], estadisticas: null };
    }
    
    const series = [{
        name: "Promedio Base Seca",
        data: nutrientesConDatos.map(n => parseFloat(n.datos.promedio_base_seca) || 0)
    }];
    
    // Categorías para el eje X
    const categories = nutrientesConDatos.map(n => n.nombre.replace(" (%)", ""));
    
    // Estadísticas específicas de materia seca
    const materiaSecaStats = nutrientes["Materia seca (%)"] || {};
    
    return {
        series,
        categories,
        estadisticas: {
            muestras: materiaSecaStats.muestras || 0,
            promedio: materiaSecaStats.promedio_base_seca || 0,
            maximo: materiaSecaStats.maximo || 0,
            minimo: materiaSecaStats.minimo || 0,
            cv: materiaSecaStats.cv || 0
        },
        ingrediente: acemiteTrigo.ingrediente || 'Acemite de Trigo',
        todosLosNutrientes: nutrientesConDatos
    };
};

export default function Graph() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // Cargar datos al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setCargando(true);
                const materias = await obtenerMaterias();
                setDatos(materias);
                setError(null);
            } catch (err) {
                setError('Error al cargar datos de nutrientes');
                console.error('Error:', err);
            } finally {
                setCargando(false);
            }
        };
        
        cargarDatos();
    }, []);
    
    // Procesar datos para el gráfico
    const datosGrafico = procesarDatosNutrientes(datos);
    
    const chartConfig = {
        type: "line",
        height: 400,
        series: datosGrafico.series,
        options: {
            chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%";
            }
        },
        colors: ["#2E86C1"],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: datosGrafico.categories,
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            title: {
                text: 'Porcentaje (%)',
                style: {
                    color: "#616161",
                    fontSize: "14px",
                    fontWeight: 500,
                }
            }
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "light",
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return val.toFixed(2) + "%"
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center'
        }
    },

};
    
    // Mostrar estado de carga
    if (cargando) {
        return (
            <div className="bg-white shadow-lg rounded-lg">
                <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Cargando datos de nutrientes...</p>
                </div>
            </div>
        );
    }
    
    // Mostrar error si hay problemas
    if (error) {
        return (
            <div className="bg-white shadow-lg rounded-lg">
                <div className="p-6 text-center">
                    <p className="text-red-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Análisis Nutricional - {datosGrafico.ingrediente || 'Aceite de Trigo'}
                        </h2>
                        <p className="text-sm text-gray-600 max-w-sm font-normal">
                            Comparación de promedios nutricionales en base seca.
                        </p>
                        {datosGrafico.estadisticas && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm font-medium text-blue-800 mb-2">Estadísticas de Materia Seca:</p>
                                <div className="text-xs text-blue-600 grid grid-cols-3 gap-2">
                                    <span><strong>Muestras:</strong> {datosGrafico.estadisticas.muestras}</span>
                                    <span><strong>Promedio:</strong> {datosGrafico.estadisticas.promedio}%</span>
                                    <span><strong>CV:</strong> {datosGrafico.estadisticas.cv}</span>
                                    <span><strong>Máximo:</strong> {datosGrafico.estadisticas.maximo}%</span>
                                    <span><strong>Mínimo:</strong> {datosGrafico.estadisticas.minimo}%</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-6 pb-6">
                {datosGrafico.series.length > 0 ? (
                    <div>
                        <Chart {...chartConfig} />
                        
                        {/* Tabla detallada de nutrientes */}
                        {datosGrafico.todosLosNutrientes && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Detalles de Nutrientes</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nutriente
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Muestras
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Promedio (Base Seca)
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Promedio (Base Fresca)
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Máximo
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Mínimo
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    CV
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {datosGrafico.todosLosNutrientes.map((nutriente, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {nutriente.nombre}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.muestras}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.promedio_base_seca}%
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.promedio_base_fresca}%
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.maximo}%
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.minimo}%
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {nutriente.datos.cv || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No se encontraron datos de aceite de trigo.</p>
                        <p className="text-sm mt-2">Buscando en base de datos: ingredientes que contengan "acemite" y "trigo"</p>
                    </div>
                )}
            </div>
        </div>
    );

}