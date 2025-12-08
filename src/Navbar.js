import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '15px',
            borderBottom: '2px solid #ccc'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2 style={{ color: 'blue', margin: 0 }}>Mi Primera App</h2>
                
                <div>
                    <Link 
                        to="/" 
                        style={{ 
                            margin: '0 10px', 
                            textDecoration: 'none',
                            color: 'blue',
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
                            color: 'blue',
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
