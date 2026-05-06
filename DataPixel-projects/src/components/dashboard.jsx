import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../i18n/AppContext'

const Dashboard = () => {
  const { t, colors } = useApp()
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
  const [user, setUser] = useState({ nombre: 'Usuario', rol: 'Cliente', email: '' })
  const [cart, setCart] = useState([])
  const [cartMessage, setCartMessage] = useState('')

  const API_URL = 'http://localhost:8081/api/productos'

  const isAdmin = typeof user.rol === 'string' && user.rol.toLowerCase().includes('administrador')

  const updateCartPrices = useCallback((latestProducts) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const latestProduct = latestProducts.find((p) => p.id === item.id)
        if (!latestProduct) return item

        const latestPrice = parseFloat(latestProduct.precio || 0)
        if (latestPrice !== item.precio) {
          setCartMessage(
            `Precio actualizado justo a tiempo: ${item.nombre} ahora cuesta $${latestPrice.toFixed(2)}`
          )
          return {
            ...item,
            precio: latestPrice,
            stock: latestProduct.cantidad,
          }
        }

        return { ...item, stock: latestProduct.cantidad }
      })
    )
  }, [])

  const syncProductos = useCallback(async () => {
    setLoadingInventario(true)
    try {
      const response = await axios.get(API_URL)
      const latestProducts = response.data
      setProductos(latestProducts)
      setErrorInventario(null)
      updateCartPrices(latestProducts)
      return latestProducts
    } catch {
      setErrorInventario('Error al cargar el inventario')
      return null
    } finally {
      setLoadingInventario(false)
    }
  }, [updateCartPrices])

  useEffect(() => {
    const storedUser = localStorage.getItem('userData')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser({
          nombre: parsed.nombre || parsed.user || parsed.usuario || 'Usuario',
          rol: parsed.rol || parsed.tipo || 'Cliente',
          email: parsed.email || '',
        })
      } catch {
        setUser({ nombre: 'Usuario', rol: 'Cliente', email: '' })
      }
    }

    syncProductos().then(() => {})
    const interval = setInterval(() => {
      syncProductos().then(() => {})
    }, 7000)
    return () => clearInterval(interval)
  }, [syncProductos])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitProducto = async (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.cantidad) {
      alert('Nombre y cantidad son obligatorios')
      return
    }

    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando.id}`, formData)
        const updatedProducts = productos.map((p) =>
          p.id === editando.id ? { ...p, ...formData } : p
        )
        setProductos(updatedProducts)
        updateCartPrices(updatedProducts)
        alert('Producto actualizado correctamente')
      } else {
        const response = await axios.post(API_URL, formData)
        const nuevoProducto = response.data
        setProductos((prev) => [...prev, nuevoProducto])
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
      const remaining = productos.filter((p) => p.id !== id)
      setProductos(remaining)
      updateCartPrices(remaining)
      setCart((prev) => prev.filter((item) => item.id !== id))
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

  const handleAddToCart = (producto) => {
    const precioActual = parseFloat(producto.precio || 0)
    if (producto.cantidad <= 0) {
      alert('No hay stock disponible para este producto')
      return
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === producto.id)
      if (existing) {
        if (existing.cantidadSolicitada >= producto.cantidad) {
          alert('Has alcanzado el límite de stock disponible para este producto')
          return prev
        }
        return prev.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidadSolicitada: item.cantidadSolicitada + 1,
                precio: precioActual,
                stock: producto.cantidad,
              }
            : item
        )
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: precioActual,
          cantidadSolicitada: 1,
          stock: producto.cantidad,
        },
      ]
    })
  }

  const handleCartQuantityChange = (id, value) => {
    const cantidad = Math.max(1, Number(value) || 1)
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          cantidadSolicitada: Math.min(cantidad, item.stock || cantidad),
        }
      })
    )
  }

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((total, item) => total + item.precio * item.cantidadSolicitada, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío')
      return
    }

    const latestProducts = await syncProductos()
    if (!latestProducts) {
      alert('No se pudo verificar los precios actuales. Intenta de nuevo.')
      return
    }

    const priceChanged = cart.some((item) => {
      const latestProduct = latestProducts.find((prod) => prod.id === item.id)
      return latestProduct && parseFloat(latestProduct.precio || 0) !== item.precio
    })

    if (priceChanged) {
      setCartMessage(
        'Uno o más precios cambiaron justo antes de pagar. El carrito se actualizó con los valores actuales.'
      )
      return
    }

    alert(`Total a pagar: $${cartTotal.toFixed(2)}. ¡Ya está listo para pagar!`)
    setCart([])
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
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: colors.text, marginBottom: '10px' }}>Hola, {user.nombre}</h2>
          <p style={{ color: colors.textDark }}>
            {isAdmin
              ? 'Estás en el panel de administrador. Aquí puedes gestionar inventario, editar precios y ver el estado de los productos.'
              : 'Bienvenido a la tienda virtual. Agrega productos al carrito y realiza tu pago con los precios actualizados en tiempo real.'}
          </p>
        </div>

        {isAdmin ? (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <h3 style={{ color: colors.textDark }}>Gestión de Inventario</h3>
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
                {formularioAbierto ? '✕ Cerrar' : '+ Nuevo Producto'}
              </button>
            </div>

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
                    <label
                      style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}
                    >
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
                    <label
                      style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}
                    >
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
                    <label
                      style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}
                    >
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
                    <label
                      style={{ color: colors.textDark, display: 'block', marginBottom: '5px' }}
                    >
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
                    {editando ? 'Guardar cambios' : 'Crear producto'}
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
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {loadingInventario && <p style={{ color: colors.textDark }}>Cargando inventario...</p>}
            {errorInventario && <p style={{ color: '#fc8181' }}>{errorInventario}</p>}

            {!loadingInventario && productos.length === 0 && !errorInventario && (
              <p style={{ color: colors.textDark }}>No hay productos registrados.</p>
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
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                      ID
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                      Nombre
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                      Cantidad
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', color: colors.textDark }}>
                      Precio
                    </th>
                    <th style={{ padding: '12px', textAlign: 'center', color: colors.textDark }}>
                      Acciones
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
                            transition: 'all 0.3s ease',
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
        ) : (
          <div>
            {cartMessage && (
              <div
                style={{
                  background: '#fed7d7',
                  border: '1px solid #f56565',
                  color: '#721c24',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
              >
                {cartMessage}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: '20px',
                alignItems: 'start',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <h3 style={{ color: colors.textDark }}>Tienda Virtual</h3>
                  <span style={{ color: colors.textDark, fontSize: '0.95rem' }}>
                    Los precios se actualizan cada 7 segundos.
                  </span>
                </div>

                {loadingInventario && (
                  <p style={{ color: colors.textDark }}>Cargando productos...</p>
                )}
                {errorInventario && <p style={{ color: '#fc8181' }}>{errorInventario}</p>}

                <div
                  style={{
                    display: 'grid',
                    gap: '18px',
                  }}
                >
                  {productos.map((producto) => (
                    <div
                      key={producto.id}
                      style={{
                        background: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div>
                        <h4 style={{ margin: 0, color: colors.text }}>{producto.nombre}</h4>
                        <p style={{ margin: '6px 0 0', color: colors.textDark }}>
                          Stock: {producto.cantidad}
                        </p>
                        <p style={{ margin: '6px 0 0', color: colors.textDark }}>
                          Precio: ${parseFloat(producto.precio || 0).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(producto)}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: colors.card,
                  borderRadius: '16px',
                  border: `1px solid ${colors.border}`,
                  padding: '20px',
                }}
              >
                <h3 style={{ marginTop: 0, color: colors.textDark }}>Carrito</h3>
                {cart.length === 0 ? (
                  <p style={{ color: colors.textDark }}>Aún no hay productos en el carrito.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'grid',
                          gap: '8px',
                          padding: '14px',
                          borderRadius: '12px',
                          border: `1px solid ${colors.border}`,
                          background: colors.bg,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong style={{ color: colors.text }}>{item.nombre}</strong>
                          <button
                            onClick={() => handleRemoveCartItem(item.id)}
                            style={{
                              background: '#ef5350',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}
                        >
                          <div>
                            <p style={{ margin: 0, color: colors.textDark }}>Precio unitario:</p>
                            <p style={{ margin: 0, color: colors.text }}>
                              ${item.precio.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <label
                              style={{
                                color: colors.textDark,
                                display: 'block',
                                marginBottom: '5px',
                              }}
                            >
                              Cantidad
                            </label>
                            <input
                              type="number"
                              min="1"
                              max={item.stock || 1}
                              value={item.cantidadSolicitada}
                              onChange={(e) => handleCartQuantityChange(item.id, e.target.value)}
                              style={{
                                width: '80px',
                                padding: '8px',
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                background: colors.input,
                                color: colors.text,
                              }}
                            />
                          </div>
                        </div>
                        <p style={{ margin: 0, color: colors.textDark }}>
                          Subtotal: ${(item.precio * item.cantidadSolicitada).toFixed(2)}
                        </p>
                      </div>
                    ))}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '15px',
                        paddingTop: '15px',
                        borderTop: `1px solid ${colors.border}`,
                      }}
                    >
                      <strong style={{ color: colors.text }}>Total</strong>
                      <strong style={{ color: colors.text }}>${cartTotal.toFixed(2)}</strong>
                    </div>
                    <button
                      onClick={handleCheckout}
                      style={{
                        background: '#48bb78',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        marginTop: '12px',
                        width: '100%',
                      }}
                    >
                      Pagar ahora
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
