// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../services/profileService';
import adopcionService from '../services/adopcionService';
import comentarioService from '../services/comentarioService';
import animalService from '../services/animalService';
import Modal from './Modal';
import './Perfil.css';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import usuarioService from '../services/usuarioService';
import { useLoading } from '../contexts/LoadingContext';
import { eliminarCuenta } from '../services/profileService';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, loading, error } = useCurrentUser();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('adopciones');
  const [adopciones, setAdopciones] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { setLoading: setGlobalLoading } = useLoading();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, item: null });

  useEffect(() => {
    setGlobalLoading(loading);
  }, [loading, setGlobalLoading]);

  useEffect(() => {
    if (!user) return;
    setLoadingData(true);
    Promise.all([
      adopcionService.getAdopcionesPorUsuario(user.id),
      comentarioService.getComentariosPorUsuario(user.id)
    ])
      .then(async ([ads, coms]) => {
        setAdopciones(ads);
        setComentarios(Array.isArray(coms) ? coms : coms.data);
      })
      .catch(() => setDataError('Error al cargar datos'))
      .finally(() => setLoadingData(false));
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMensaje('❌ Solo se permiten imágenes.');
      setTimeout(() => setMensaje(''), 4000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMensaje('❌ La imagen no puede pesar más de 5MB.');
      setTimeout(() => setMensaje(''), 4000);
      return;
    }

    const formData = new FormData();
    formData.append("foto_perfil", file);

    try {
      await usuarioService.updateUsuario(user.id, formData);
      setMensaje('✅ Imagen actualizada correctamente.');
      setTimeout(() => {
        setMensaje('');
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Error al actualizar la imagen:", err);
      setMensaje('❌ Error al subir la imagen.');
      setTimeout(() => setMensaje(''), 4000);
    }
  };

  const openModal = (type, item) => setModalConfig({ isOpen: true, type, item });
  const closeModal = () => setModalConfig({ isOpen: false, type: null, item: null });

  const handleModalSave = (type, item, form) => {
    if (type === 'editAdopcion') {
      const formData = new FormData();
      if (form.pdf) formData.append('contenido', form.pdf);

      adopcionService.actualizarAdopcionConPdf(item.id, formData)
        .then(u => {
          setAdopciones(curr =>
            curr.map(a => a.id === u.id ? { ...a, contenido: u.contenido } : a)
          );
          setMensaje('✅ Adopción actualizada correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al actualizar la adopción.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'editComentario') {
      comentarioService.actualizarComentario(item.id, { contenido: form.texto })
        .then(() => {
          setComentarios(curr =>
            curr.map(c => c.id === item.id ? { ...c, contenido: form.texto } : c)
          );
          setMensaje('✅ Comentario actualizado correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al actualizar el comentario.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }
  };

  const handleModalDelete = (type, item) => {
    if (type === 'deleteAdopcion') {
      adopcionService.eliminarAdopcion(item.id)
        .then(() => {
          setAdopciones(curr => curr.filter(a => a.id !== item.id));
          setMensaje('✅ Adopción eliminada correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar la adopción.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'deleteComentario') {
      comentarioService.eliminarComentario(item.id)
        .then(() => {
          setComentarios(curr => curr.filter(c => c.id !== item.id));
          setMensaje('✅ Comentario eliminado correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar el comentario.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'deleteCuenta') {
      eliminarCuenta()
        .then(() => {
          logout();
          navigate('/');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar la cuenta.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }
  };

  if (loading) return <p>Cargando perfil…</p>;
  if (error) return <p>Error al cargar perfil.</p>;
  if (!user) return <p>No estás autenticado.</p>;

  return (
    <div className="profile-container profile">
      <h1>Mi Perfil</h1>

      <div className="profile-info-row">
        <div className="profile-picture-container">
          <label htmlFor="foto_perfil" className="profile-picture-label">
            <img
              src={`${process.env.REACT_APP_BACK_URL}${user.foto_perfil}`}
              alt="Foto de perfil"
              className="profile-picture-img"
            />
            <div className="profile-picture-overlay">Editar</div>
          </label>
          <input
            type="file"
            id="foto_perfil"
            accept="image/*"
            onChange={handleFileChange}
            className="profile-picture-input"
          />
        </div>

        <div className="profile-user-data">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button onClick={() => openModal('deleteCuenta', {})} className="profile-delete-link">
            Eliminar cuenta
          </button>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row gap-3 mt-3">
        <button className="custom-btn logout" onClick={logout}>Cerrar sesión</button>
        {user.is_staff && (
          <a
            href={`${process.env.REACT_APP_BACK_URL}/admin/`}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-btn admin"
          >
            Panel de administración
          </a>
        )}
      </div>

      <div className="profile-tabs">
        {['adopciones', 'comentarios'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'profile-tab-active' : 'profile-tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {mensaje && (
        <div className={`alert-message ${mensaje.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>
          {mensaje.replace('✅', '').replace('❌', '').trim()}
        </div>
      )}

      <div className="profile-tab-content">
        {loadingData && <p>Cargando datos…</p>}
        {dataError && <p>{dataError}</p>}
        {!loadingData && !dataError && activeTab === 'adopciones' && (
          <div className="profile-card-grid">
            {adopciones.map(a => (
              <div key={a.id} className="profile-card">
                <img src={a.animal?.imagen || ''} alt={a.animal?.nombre} className="profile-card-img" />
                <div className="profile-card-body">
                  <h3>{a.animal?.nombre || '—'}</h3>
                  <p>Estado: <span>{a.aceptada}</span></p>
                  <button onClick={() => openModal('editAdopcion', a)}><Pencil size={16} /></button>
                  <button onClick={() => openModal('deleteAdopcion', a)}><Trash size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loadingData && !dataError && activeTab === 'comentarios' && (
          <div className="profile-card-grid">
            {comentarios.map(c => (
              <div key={c.id} className="profile-card">
                <div className="profile-card-body">
                  <p>{c.contenido || c.text}</p>
                  <small>{new Date(c.fecha_hora || c.created_at).toLocaleString()}</small>
                  <button onClick={() => openModal('editComentario', c)} className="icon-button">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => openModal('deleteComentario', c)} className="icon-button">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        item={modalConfig.item}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
      />
    </div>
  );
}
