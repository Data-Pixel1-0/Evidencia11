import React, { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [data, setData] = useState(null)

  const fetchData = () => {
    setStatus('loading')

    // Simulación de API
    setTimeout(() => {
      const success = Math.random() > 0.3

      if (success) {
        setData('Datos cargados correctamente ')
        setStatus('success')
      } else {
        setStatus('error')
      }
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Manejo de Estados</h1>

      <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded">
        Cargar Datos
      </button>

      {status === 'loading' && <p>Cargando... </p>}

      {status === 'success' && <p>{data}</p>}

      {status === 'error' && <p className="text-red-500">Error al cargar los datos </p>}
    </div>
  )
}
