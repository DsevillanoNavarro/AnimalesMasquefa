import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/productos/')
            .then(response => {
                console.log(response.data);  // Puedes ver cómo son los datos
                setProductos(response.data);  // Establecer los productos correctamente
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        {producto.nombre}: {producto.descripcion}  {/* Usamos 'nombre' y 'descripcion' */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
