import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
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
        // Actualizar producto
        await axios.put(`${API_URL}/${editando.id}`, formData)
        setProductos((prev) =>
          prev.map((p) => (p.id === editando.id ? { ...editando, ...formData } : p))
        )
        alert('Producto actualizado correctamente')
      } else {
        // Crear nuevo producto
        const response = await axios.post(API_URL, formData)
        setProductos((prev) => [...prev, response.data])
        alert('Producto creado correctamente')
      }

      // Limpiar formulario
      setFormData({ nombre: '', cantidad: '', precio: '', descripcion: '' })
      setFormularioAbierto(false)
      setEditando(null)
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'No se pudo guardar el producto'))
    }
  }

  // Abrir formulario de edición
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

  // Eliminar producto
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

  // Cancelar edición
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
        background: '#1a202c',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #2d3748',
      }}
    >
      {/* Barra Lateral Común */}
      <div
        className="sidebar"
        style={{
          width: '220px',
          background: '#2d3748',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', textAlign: 'center' }}>Data Pixel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <Link
            to="/dashboard"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              background: '#4a5568',
              borderRadius: '5px',
            }}
          >
            🏠 Inicio
          </Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            👤 Mi Perfil
          </Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            ⚙️ Configuración
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
        }}
      >
        <header
          style={{ marginBottom: '30px', borderBottom: '1px solid #2d3748', paddingBottom: '10px' }}
        >
          <h2>Panel de Control</h2>
          <p style={{ color: '#a0aec0' }}>Resumen de operaciones Tecnoglass</p>
        </header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              background: '#2d3748',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <span>Proyectos</span>
            <h3 style={{ fontSize: '2rem' }}>08</h3>
          </div>
          <div
            style={{
              background: '#2d3748',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #48bb78',
            }}
          >
            <span>Usuarios</span>
            <h3 style={{ fontSize: '2rem' }}>24</h3>
          </div>
        </div>

        {/* Sección de Inventario */}
        <div style={{ marginTop: '30px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <h3 style={{ color: '#a0aec0' }}>📦 Gestión de Inventario</h3>
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
              }}
            >
              {formularioAbierto ? '✕ Cerrar' : '+ Nuevo Producto'}
            </button>
          </div>

          {/* Formulario de Crear/Editar */}
          {formularioAbierto && (
            <form
              onSubmit={handleSubmitProducto}
              style={{
                background: '#2d3748',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #4a5568',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ color: '#a0aec0', display: 'block', marginBottom: '5px' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: '#1a202c',
                      border: '1px solid #4a5568',
                      color: 'white',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                    placeholder="Nombre del producto"
                  />
                </div>
                <div>
                  <label style={{ color: '#a0aec0', display: 'block', marginBottom: '5px' }}>
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: '#1a202c',
                      border: '1px solid #4a5568',
                      color: 'white',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={{ color: '#a0aec0', display: 'block', marginBottom: '5px' }}>
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: '#1a202c',
                      border: '1px solid #4a5568',
                      color: 'white',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label style={{ color: '#a0aec0', display: 'block', marginBottom: '5px' }}>
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: '#1a202c',
                      border: '1px solid #4a5568',
                      color: 'white',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
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
                  }}
                >
                  {editando ? '✓ Guardar Cambios' : '✓ Crear Producto'}
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
                  }}
                >
                  ✕ Cancelar
                </button>
              </div>
            </form>
          )}

          {loadingInventario && <p style={{ color: '#cbd5e0' }}>Cargando inventario...</p>}
          {errorInventario && <p style={{ color: '#fc8181' }}>{errorInventario}</p>}

          {!loadingInventario && productos.length === 0 && !errorInventario && (
            <p style={{ color: '#cbd5e0' }}>No hay productos registrados.</p>
          )}

          {productos.length > 0 && (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#2d3748',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: '#1a202c', borderBottom: '2px solid #4a5568' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#a0aec0' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#a0aec0' }}>Nombre</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#a0aec0' }}>Cantidad</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#a0aec0' }}>Precio</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#a0aec0' }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} style={{ borderBottom: '1px solid #4a5568' }}>
                    <td style={{ padding: '12px', color: '#cbd5e0' }}>{producto.id}</td>
                    <td style={{ padding: '12px', color: '#cbd5e0' }}>{producto.nombre}</td>
                    <td style={{ padding: '12px', color: '#cbd5e0' }}>{producto.cantidad}</td>
                    <td style={{ padding: '12px', color: '#cbd5e0' }}>
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
                        }}
                      >
                        ✏️ Editar
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
                        }}
                      >
                        🗑️ Eliminar
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
