import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Tarjeta from './Tarjeta';  

function App() {
  const nombre = "Oscar";
  const edad = 28;
  const tecnologias = ["React", "JavaScript", "HTML", "CSS"];
  const fechaActual = new Date().toLocaleDateString();
  const [contador, setContador] = useState(0);
  const [nombreDinamico, setNombreDinamico] = useState(nombre);

  const manejarClick = () => {
    setContador(contador + 1);
  };

  const manejarCambioNombre = (event) => {
    setNombreDinamico(event.target.value);
  };

  const proyectos = [
    {
      id: 1,
      titulo: "Mi primera página web",
      contenido: "Creé mi primera página web usando HTML y CSS. Fue una experiencia emocionante aprender a estructurar contenido y darle estilo.",
      color: "#ffcc00"
    },
    {
      id: 2,
      titulo: "Aplicación de tareas",
      contenido: "Desarrollé una aplicación para gestionar tareas diarias utilizando React. Aprendí sobre el manejo del estado y componentes.",
      color: "#00ccff"
    },
    {
      id: 3,
      titulo: "Blog personal",
      contenido: "Lancé un blog personal donde comparto mis experiencias y aprendizajes en programación. Utilicé Gatsby para generar el sitio estático.",
      color: "#ff66cc"
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ¡Hola! Esta es mi primera aplicación en React!
        </p>
        <div>
          <h2>Sobre mí</h2>
          <p>Mi nombre es {nombreDinamico} y tengo {edad} años.</p>
          <p>Estoy aprendiendo: {tecnologias.join(", ")}.</p>
          <p>Fecha de hoy: {fechaActual}</p>
        </div>

        <div>
          <h2>Mi primer contador</h2>
          <p>Has hecho click {contador} veces</p>
          <button onClick={manejarClick} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px'
          }}>
            ¡Haz click aquí!
          </button>
        </div>

        <div>
          <h2>Cambia tu nombre</h2>
          <input
            type="text"
            value={nombreDinamico}
            onChange={manejarCambioNombre}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '2px solid #61dafb',
              margin: '10px'
            }}
          />
          <p>Hola, {nombreDinamico}!</p>
        </div>
        
        <Tarjeta 
          titulo="Tarjeta de Bienvenida" 
          contenido="¡Bienvenido a mi primera aplicación en React! Estoy aprendiendo mucho y me encanta." 
          color="#20232a" 
        />

        <div>
          <h2>Mis Proyectos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {proyectos.map(proyecto => (
              <Tarjeta 
                key={proyecto.id}
                titulo={proyecto.titulo}
                contenido={proyecto.contenido}
                color={proyecto.color}
              />
            ))}
          </div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;