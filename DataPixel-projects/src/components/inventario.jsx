import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InventarioDataPixel = () => {
  const [productos, setProductos] = useState([])
  const API_URL = 'http://localhost:8080/api/productos' // URL de tu backend

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_URL)
      setProductos(response.data)
    } catch (error) {
      console.error('Error al obtener datos')
    }
  }

  const agregarProducto = async (nuevo) => {
    try {
      await axios.post(API_URL, nuevo)
      obtenerProductos() // Refresca la lista
    } catch (error) {
      console.error('Error al crear registro')
    }
  }

  // 3. Operación PATCH/PUT: Actualizar datos
  // Modifica la cantidad de un producto existente
  const actualizarStock = async (id, nuevaCantidad) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { cantidad: nuevaCantidad })
      obtenerProductos()
    } catch (error) {
      console.error('Error al actualizar')
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return <div>{/* Aquí iría la tabla de productos de Data Pixel */}</div>
}

export default InventarioDataPixel
