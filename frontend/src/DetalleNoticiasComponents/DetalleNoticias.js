import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { useAuth } from "../contexts/AuthContext";
import noticiaService from "../services/noticiaService";
import comentarioService from "../services/comentarioService";
import "./DetalleNoticias.css";

const DetalleNoticias = () => {
  const { id } = useParams();
  const { loading, setLoading } = useLoading();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentariosLoading, setComentariosLoading] = useState(false);
  const [comentarioError, setComentarioError] = useState(null);
  const [responderA, setResponderA] = useState(null);
  const [respuestaTexto, setRespuestaTexto] = useState("");

  useEffect(() => {
    setLoading(true);
    noticiaService
      .getNoticia(id)
      .then((res) => setNoticia(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  useEffect(() => {
    if (!id) return;
    setComentariosLoading(true);
    comentarioService
      .getComentariosPorNoticia(id)
      .then((comments) => {
        setComentarios(Array.isArray(comments) ? comments : []);
      })
      .catch((err) => {
        console.error(err);
        setComentarioError("Error al cargar comentarios");
      })
      .finally(() => setComentariosLoading(false));
  }, [id]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handlePublicarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    setComentarioError(null);

    try {
      const newComment = await comentarioService.crearComentario({
        noticia: id,
        contenido: nuevoComentario.trim(), // ✅ CAMBIO AQUÍ
      });
      setComentarios((prev) => [newComment, ...prev]);
      setNuevoComentario("");
    } catch (error) {
      console.error(error);
      setComentarioError("Error al publicar comentario");
    }
  };

  const handleResponder = async (parentId) => {
    if (!respuestaTexto.trim()) return;
    try {
      const newReply = await comentarioService.crearComentario({
        noticia: id,
        contenido: respuestaTexto.trim(), // ✅ CAMBIO AQUÍ
        parent: parentId,
      });
      
      setComentarios((prev) => [...prev, newReply]);
      setRespuestaTexto("");
      setResponderA(null);
    } catch (err) {
      console.error("Error al responder comentario", err);
      setComentarioError("Error al responder comentario");
    }
  };

  const renderComentarios = (lista, parentId = null, nivel = 0) =>
    lista
      .filter((c) => c.parent === parentId)
      .sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora))
      .map((comentario) => (
        <div
          key={comentario.id}
          className="mb-3 pb-2"
          style={{ marginLeft: nivel * 20 }}
        >
          <div className="border-start ps-3">
            <strong>{comentario.usuario}</strong>{" "}
            <small className="text-muted">
              - {new Date(comentario.fecha_hora).toLocaleString()}
            </small>
            <p>{comentario.contenido}</p>
            {isAuthenticated && (
              <button
                className="btn btn-sm btn-outline-secondary mb-2"
                onClick={() =>
                  setResponderA(responderA === comentario.id ? null : comentario.id)
                }
              >
                {responderA === comentario.id ? "Cancelar" : "Responder"}
              </button>
            )}
            {responderA === comentario.id && (
              <div className="mb-3">
                <textarea
                  className="form-control mb-2"
                  placeholder="Escribe tu respuesta..."
                  rows="2"
                  value={respuestaTexto}
                  onChange={(e) => setRespuestaTexto(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleResponder(comentario.id)}
                >
                  Enviar respuesta
                </button>
              </div>
            )}
            {/* Renderiza respuestas recursivamente */}
            {renderComentarios(lista, comentario.id, nivel + 1)}
          </div>
        </div>
      ));

  if (!noticia) return null;

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

      {/* Comentarios */}
      <div className="comments-section mt-5">
        <h3>Comentarios</h3>
        {isAuthenticated ? (
          <>
            <textarea
              className="form-control mb-2"
              placeholder="Escribe un comentario..."
              rows="3"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button
              className="btn btn-primary mb-3"
              onClick={handlePublicarComentario}
            >
              Publicar
            </button>
            {comentarioError && (
              <div className="alert alert-danger">{comentarioError}</div>
            )}
            {comentariosLoading ? (
              <p>Cargando comentarios...</p>
            ) : comentarios.length === 0 ? (
              <p>No hay comentarios aún.</p>
            ) : (
              renderComentarios(comentarios)
            )}
          </>
        ) : (
          <div className="alert alert-info mt-3">
            Debes estar logueado para ver o escribir comentarios.
            <br />
            <button
              className="btn btn-outline-primary mt-2"
              onClick={handleLoginRedirect}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleNoticias;
