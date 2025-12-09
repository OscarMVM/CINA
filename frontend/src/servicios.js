import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Servicio para obtener datos de CINA desde la API
export const obtenerMaterias = async () => {
    try {
        console.log("Cargando datos desde la API...");
        
        const response = await axios.get(`${API_BASE_URL}/materias`);
        
        console.log("Datos cargados desde la API!");
        return response.data;
        
    } catch (error) {
        console.error('Error al cargar datos de la API:', error);
    }
};
