import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { obtenerMaterias } from './servicios';

export default function Graph() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const materias = await obtenerMaterias();
                setDatos(materias);
            } catch (error) {
                console.error('Error:', error);
            }
            setCargando(false);
        };
        cargar();
    }, []);

    // Buscar datos de trigo
    const trigo = datos.find(m => 
        m.ingrediente?.toLowerCase().includes('acemite')
    );

    if (cargando) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2">Cargando...</p>
            </div>
        );
    }

    if (!trigo?.nutrientes) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <p>No se encontraron datos de trigo</p>
            </div>
        );
    }

    // Datos para mostrar
    const materiaSecaData = trigo.nutrientes["Materia seca (%)"];

    // Configuración simple del gráfico
    const chartConfig = {
        type: "bar",
        height: 300,
        series: [{
            name: "Promedio",
            data: [
                trigo.nutrientes["Materia seca (%)"]?.promedio_base_seca || 0,
                trigo.nutrientes["Proteína cruda (%)"]?.promedio_base_seca || 0,
                trigo.nutrientes["Fibra cruda (%)"]?.promedio_base_seca || 0,
                trigo.nutrientes["Extracto etéreo (%)"]?.promedio_base_seca || 0
            ]
        }],
        options: {
            chart: { toolbar: { show: false } },
            xaxis: {
                categories: ["Materia seca", "Proteína", "Fibra", "Grasa"]
            },
            colors: ["#2E86C1"],
            dataLabels: {
                enabled: true,
                formatter: (val) => val.toFixed(1) + "%"
            }
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg">
            {/* Header */}
            <div className="p-6 border-b">
                <div className="flex items-center gap-4">
            
                    <div>
                        <h2 className="text-xl font-semibold">{trigo.ingrediente}</h2>
                        <p className="text-gray-600">Análisis nutricional</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Estadísticas de Materia Seca */}
                {materiaSecaData && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">Materia Seca (%)</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm text-blue-600">
                            <div><strong>Muestras:</strong> {materiaSecaData.muestras}</div>
                            <div><strong>Promedio:</strong> {materiaSecaData.promedio_base_seca}%</div>
                            <div><strong>CV:</strong> {materiaSecaData.cv}</div>
                            <div><strong>Máximo:</strong> {materiaSecaData.maximo}%</div>
                            <div><strong>Mínimo:</strong> {materiaSecaData.minimo}%</div>
                        </div>
                    </div>
                )}

                {/* Gráfico */}
                <Chart {...chartConfig} />

                {/* Tabla simple */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-3">Resumen de Nutrientes</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left">Nutriente</th>
                                    <th className="p-3 text-left">Muestras</th>
                                    <th className="p-3 text-left">Promedio</th>
                                    <th className="p-3 text-left">CV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(trigo.nutrientes).map(([nombre, datos]) => (
                                    <tr key={nombre} className="border-t">
                                        <td className="p-3">{nombre}</td>
                                        <td className="p-3">{datos.muestras}</td>
                                        <td className="p-3">{datos.promedio_base_seca}%</td>
                                        <td className="p-3">{datos.cv || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}