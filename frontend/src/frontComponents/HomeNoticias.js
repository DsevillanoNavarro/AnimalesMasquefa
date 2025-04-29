import React, { useEffect, useState } from "react";
import noticiaService from "../services/noticiaService";
import "./HomeNoticias.css";

const NoticiasRecientes = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    noticiaService.getNoticias().then((res) => {
      const ultimasNoticias = res.data.slice(-3).reverse();
      setNoticias(ultimasNoticias);
    });
  }, []);

  return (
    <div className="container HomeNoticiasContainer news-gallery py-4">
      <h1 className="gallery-title">ÚLTIMAS NOTICIAS</h1>
      <div className="row gx-4 justify-content-center">
        {noticias.map((noticia, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
            <div className="card noticia-card border-0">
              <div className="noticia-image-container">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="card-img-top noticia-image"
                />
                <div className="overlay">
                  <a href={`/noticias/${noticia.id}`}>
                    <button className="adopt-btn">Leer más</button>
                  </a>
                </div>
              </div>
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start noticia-title">
                  <a href={`/noticias/${noticia.id}`} className="noticia-link">
                    {noticia.titulo.length > 50
                      ? noticia.titulo.slice(0, 50) + "..."
                      : noticia.titulo}
                  </a>
                </h6>
                <p className="card-text noticia-summary">
                  {noticia.contenido.slice(0, 80)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticiasRecientes;
