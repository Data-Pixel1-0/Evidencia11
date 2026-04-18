import React, { useState, useEffect } from 'react'
import axios from 'axios' // Importación de Axios según la guía [cite: 118]

const InventarioDataPixel = () => {
  // 1. Manejo de estados (Punto 4 de la guía) [cite: 82]
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false) // Estado: loading [cite: 83]
  const [error, setError] = useState(null) // Estado: error [cite: 84]

  const API_URL = 'http://localhost:8081/api/productos'

  // --- OPERACIÓN 1: Listar datos (GET) [cite: 79] ---
  const obtenerInventario = async () => {
    setLoading(true) // Inicia estado de carga [cite: 118]
    try {
      const response = await axios.get(API_URL)
      setProductos(response.data)
      setError(null)
    } catch {
      setError('Error al conectar con el sistema del robot') // Manejo de error [cite: 119]
    } finally {
      setLoading(false)
    }
  }

  // --- OPERACIÓN 2 y 3: Funciones auxiliares disponibles para más adelante ---

  useEffect(() => {
    obtenerInventario()
  }, [])

  return (
    <div>
      <h2>Gestión de Inventario - Data Pixel</h2>
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {productos.length === 0 && !loading ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{producto.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{producto.nombre}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default InventarioDataPixel
