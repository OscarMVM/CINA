import React, { useState } from 'react';

function Inicio() {
    const [contador, setContador] = useState(0);
    const [nombreDinamico, setNombreDinamico] = useState("Oscar");

    const manejarClick = () => {
        setContador(contador + 1);
    };

    const manejarCambioNombre = (event) => {
        setNombreDinamico(event.target.value);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'blue', fontSize: '36px' }}>
                ¡Mi Primera App en React!
            </h1>
            
            <div style={{ margin: '20px 0' }}>
                <h2>Sobre mí</h2>
                <p>Mi nombre es {nombreDinamico} y tengo 28 años.</p>
                <p>Estoy aprendiendo React, JavaScript, HTML y CSS.</p>
                <p>Fecha de hoy: {new Date().toLocaleDateString()}</p>
            </div>

            <div style={{ margin: '30px 0' }}>
                <h2>Mi Primer Contador</h2>
                <p style={{ fontSize: '24px', color: 'green' }}>{contador}</p>
                <p>Has hecho click {contador} veces</p>
                <button 
                    onClick={manejarClick}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    ¡Haz click aquí!
                </button>
            </div>

            <div style={{ margin: '30px 0' }}>
                <h2>Cambia tu nombre</h2>
                <input
                    type="text"
                    value={nombreDinamico}
                    onChange={manejarCambioNombre}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        border: '2px solid blue',
                        borderRadius: '5px',
                        margin: '10px'
                    }}
                />
                <p>¡Hola, {nombreDinamico}!</p>
            </div>
        </div>
    );
}

export default Inicio;