import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import noticiaService from "../services/noticiaService";
import "./DetalleNoticias.css";

const NoticiaDetail = () => {
  const { id } = useParams();
  const { loading, setLoading } = useLoading();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    setLoading(true);
    noticiaService
      .getNoticia(id)
      .then((res) => setNoticia(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  if (loading) return null;
  if (!noticia) return <p className="loading">Noticia no encontrada</p>;

  return (
    <div className="container NoticiaDetail mt-5 pt-5 slide-down-fade">
      <div className="row align-items-start">
        {/* Imagen */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="img-fluid rounded"
          />
        </div>
        {/* Texto */}
        <div className="col-12 col-md-6">
          <h1 className="detail-title">{noticia.titulo}</h1>
          <p className="detail-date">
            {new Date(noticia.fecha_publicacion).toLocaleDateString()}
          </p>
          <div className="detail-content">
            {noticia.contenido.split("\n\n").map((parr, i) => (
              <p key={i}>{parr}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticiaDetail;
