function Tarjeta({titulo, contenido, color}) {
    return (
        <div style={{
            backgroundColor: color || '#282c34',
            border: '2px solid #61dafb',
            borderRadius: '10px',
            padding: '20px',
            margin: '10px',
            maxWidth: '300px'
        }}>
            <h3>{titulo}</h3>
            <p>{contenido}</p>
        </div>
    );
}

export default Tarjeta;