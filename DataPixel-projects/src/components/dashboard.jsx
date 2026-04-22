import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../i18n/AppContext'

const Dashboard = () => {
  const { theme, language, t, colors } = useApp()
  const [productos, setProductos] = useState([])
  const [loadingInventario, setLoadingInventario] = useState(false)
  const [errorInventario, setErrorInventario] = useState(null)
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    descripcion: '',
  })

  const API_URL = 'http://localhost:8081/api/productos'

  // Obtener inventario
  useEffect(() => {
    const obtenerInventario = async () => {
      setLoadingInventario(true)
      try {
        const response = await axios.get(API_URL)
        setProductos(response.data)
        setErrorInventario(null)
      } catch {
        setErrorInventario('Error al cargar el inventario')
      } finally {
        setLoadingInventario(false)
      }
    }

    obtenerInventario()
  }, [])

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Crear o actualizar producto
  const handleSubmitProducto = async (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.cantidad) {
      alert('Nombre y cantidad son obligatorios')
      return
    }

    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando.id}`, formData)
        setProductos((prev) =>
          prev.map((p) => (p.id === editando.id ? { ...editando, ...formData } : p))
        )
        alert('Producto actualizado correctamente')
      } else {
        const response = await axios.post(API_URL, formData)
        setProductos((prev) => [...prev, response.data])
        alert('Producto creado correctamente')
      }

      setFormData({ nombre: '', cantidad: '', precio: '', descripcion: '' })
      setFormularioAbierto(false)
      setEditando(null)
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'No se pudo guardar el producto'))
    }
  }

  const handleEditar = (producto) => {
    setEditando(producto)
    setFormData({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      precio: producto.precio || '',
      descripcion: producto.descripcion || '',
    })
    setFormularioAbierto(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return
    }

    try {
      await axios.delete(`${API_URL}/${id}`)
      setProductos((prev) => prev.filter((p) => p.id !== id))
      alert('Producto eliminado correctamente')
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'No se pudo eliminar el producto'))
    }
  }

  const handleCancelar = () => {
    setFormularioAbierto(false)
    setEditando(null)
    setFormData({ nombre: '', cantidad: '', precio: '', descripcion: '' })
  }

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        minHeight: '80vh',
        background: colors.bg,
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Barra Lateral Común */}
      <div
        className="sidebar"
        style={{
          width: '220px',
          background: colors.sidebar,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'all 0.3s ease',
        }}
      >
        <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', textAlign: 'center' }}>Data Pixel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <Link
            to="/dashboard"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              background: colors.border,
              borderRadius: '5px',
              transition: 'all 0.3s ease',
            }}
          >
            🏠 {t('inicio')}
          </Link>
          <Link
            to="/profile"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            👤 {t('miPerfil')}
          </Link>
          <Link
            to="/settings"
            style={{
              color: colors.text,
              textDecoration: 'none',
              padding: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            ⚙️ {t('configuracion')}
          </Link>
        </nav>
      </div>

      {/* Contenido Principal */}
      <div
        style={{
          flex: 1,
          padding: '30px',
          textAlign: 'left',
          overflowY: 'auto',
          maxHeight: '80vh',
          background: colors.bg,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Sección de Inventario - Subida automáticamente al quitar las tarjetas */}
        <div style={{ marginTop: '10px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <h3 style={{ color: colors.textDark }}>{t('gestionInventario')}</h3>
            <button
              onClick={() => setFormularioAbierto(!formularioAbierto)}
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
            >
              {formularioAbierto ? '✕ ' + t('cerrar') : '+ ' + t('nuevoProducto')}
            </button>
          </div>

          {/* Formulario de Crear/Editar */}
          {formularioAbierto && (
            <form
              onSubmit={handleSubmitProducto}
              style={{
                background: colors.card,
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}>
                    {t('nombre')} *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: colors.input,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                    }}
                    placeholder="Nombre del producto"
                  />
                </div>
                <div>
                  <label style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}>
                    {t('cantidad')} *
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: colors.input,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}>
                    {t('precio')}
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: colors.input,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                    }}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}>
                    {t('descripcion')}
                  </label>
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: colors.input,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                    }}
                    placeholder="Descripción del producto"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#48bb78',
                    color: 'white',
                    padding: '10px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {editando ? '✓ ' + t('guardarCambios') : '✓ Crear'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelar}
                  style={{
                    background: '#ef5350',
                    color: 'white',
                    padding: '10px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  ✕ {t('cancelar')}
                </button>
              </div>
            </form>
          )}

          {loadingInventario && <p style={{ color: colors.textDark }}>{t('cargando')}</p>}
          {errorInventario && <p style={{ color: '#fc8181' }}>{errorInventario}</p>}

          {!loadingInventario && productos.length === 0 && !errorInventario && (
            <p style={{ color: colors.textDark }}>{t('sinProductos')}</p>
          )}

          {productos.length > 0 && (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: colors.card,
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: colors.bg,
                    borderBottom: `2px solid ${colors.border}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                    {t('nombre')}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                    {t('cantidad')}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                    {t('precio')}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: colors.textDark }}>
                    {t('acciones')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr
                    key={producto.id}
                    style={{
                      borderBottom: `1px solid ${colors.border}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <td style={{ padding: '12px', color: colors.text }}>{producto.id}</td>
                    <td style={{ padding: '12px', color: colors.text }}>{producto.nombre}</td>
                    <td style={{ padding: '12px', color: colors.text }}>{producto.cantidad}</td>
                    <td style={{ padding: '12px', color: colors.text }}>
                      ${parseFloat(producto.precio || 0).toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        onClick={() => handleEditar(producto)}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        ✏️ {t('editar')}
                      </button>
                      <button
                        onClick={() => handleEliminar(producto.id)}
                        style={{
                          background: '#ef5350',
                          color: 'white',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        🗑️ {t('eliminar')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
