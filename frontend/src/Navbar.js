import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ 
            backgroundColor: '#101010', 
            padding: '15px',
            borderBottom: '2px solid #ccc'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2 style={{ color: 'white', margin: 0 }}>Mi Primera App</h2>
                
                <div>
                    <Link 
                        to="/" 
                        style={{ 
                            margin: '0 10px', 
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        Inicio
                    </Link>
                    <Link 
                        to="/cina" 
                        style={{ 
                            margin: '0 10px', 
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        Cina
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;