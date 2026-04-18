import React, { useState, useEffect } from 'react'
import axios from 'axios' // Importación de Axios según la guía [cite: 118]

const InventarioDataPixel = () => {
  // 1. Manejo de estados (Punto 4 de la guía) [cite: 82]
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false) // Estado: loading [cite: 83]
  const [error, setError] = useState(null) // Estado: error [cite: 84]
  const [success, setSuccess] = useState(false) // Estado: success [cite: 85]

  const API_URL = 'http://localhost:8080/api/productos'

  // --- OPERACIÓN 1: Listar datos (GET) [cite: 79] ---
  const obtenerInventario = async () => {
    setLoading(true) // Inicia estado de carga [cite: 118]
    try {
      const response = await axios.get(API_URL)
      setProductos(response.data)
      setError(null)
    } catch (err) {
      setError('Error al conectar con el sistema del robot') // Manejo de error [cite: 119]
    } finally {
      setLoading(false)
    }
  }

  // --- OPERACIÓN 2: Crear datos (POST) [cite: 80] ---
  const registrarNuevoProducto = async (producto) => {
    try {
      await axios.post(API_URL, producto)
      setSuccess(true) // Operación exitosa [cite: 120]
      obtenerInventario() // Refrescar lista
    } catch (err) {
      setError('No se pudo registrar el escaneo')
    }
  }

  // --- OPERACIÓN 3: Actualizar datos (PUT/PATCH) [cite: 81] ---
  const actualizarStock = async (id, nuevaCantidad) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { cantidad: nuevaCantidad })
      obtenerInventario()
    } catch (err) {
      setError('Error al actualizar las existencias')
    }
  }

  useEffect(() => {
    obtenerInventario()
  }, [])

  return (
    <div>
      <h2>Gestión de Inventario - Data Pixel</h2>
      {/* Visualización de estados según la guía */}
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>¡Registro actualizado!</p>}

      {/* Aquí mapeas los productos para mostrarlos en la tabla */}
    </div>
  )
}

export default InventarioDataPixel
