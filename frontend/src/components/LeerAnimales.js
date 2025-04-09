import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/animales/')
      .then(response => setAnimales(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista de Animales</h1>
      <ul>
        {animales.map(animal => (
          <li key={animal.id}>
            <h3>{animal.nombre}</h3>
            <p>Edad: {animal.edad}</p>
            <p>{animal.situacion}</p>
            {animal.imagen && <img src={`${animal.imagen}`} alt={animal.nombre} width="150" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
