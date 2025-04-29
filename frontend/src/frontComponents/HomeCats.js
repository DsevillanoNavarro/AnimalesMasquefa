import React, { useEffect, useState } from "react";
import animalService from "../services/animalService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeCats.css";

const CatGallery = () => {
  const [gatos, setGatos] = useState([]);

  useEffect(() => {
    animalService.getAnimales().then((response) => {
      const ordenados = response.data.sort((a, b) => b.id - a.id);
      const ultimos4 = ordenados.slice(0, 4);
      setGatos(ultimos4);
    });
  }, []);

  return (
    <div className="container HomeCatsContainer cat-gallery py-4">
      <h1 className="gallery-title">ÚLTIMOS GATOS RESCATADOS</h1>
      <div className="row gx-4 justify-content-center">
        {gatos.map((gato) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={gato.id}>
            <div className="card cat-card border-0">
              <div className="cat-image-container">
                <img
                  src={gato.imagen}
                  alt={gato.nombre}
                  className="card-img-top cat-image"
                />
                <div className="overlay">
                  <button className="adopt-btn">Adóptalo</button>
                </div>
              </div>
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start cat-name">{gato.nombre}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatGallery;
