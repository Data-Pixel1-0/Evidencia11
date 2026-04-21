import React, { createContext, useState, useEffect } from 'react'
import translations from './translations'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('appTheme')
    return saved || 'dark'
  })

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('appLanguage')
    return saved || 'es'
  })

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.style.backgroundColor = '#f5f5f5'
      root.style.color = '#000'
    } else {
      root.style.backgroundColor = '#1a202c'
      root.style.color = '#fff'
    }
    localStorage.setItem('appTheme', theme)
  }, [theme])

  // Guardar idioma
  useEffect(() => {
    localStorage.setItem('appLanguage', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || translations.es[key] || key
  }

  const themeColors = {
    dark: {
      bg: '#1a202c',
      sidebar: '#2d3748',
      card: '#2d3748',
      text: '#cbd5e0',
      textDark: '#a0aec0',
      border: '#4a5568',
      input: '#1a202c',
    },
    light: {
      bg: '#f5f5f5',
      sidebar: '#e0e0e0',
      card: '#ffffff',
      text: '#000000',
      textDark: '#333333',
      border: '#cccccc',
      input: '#ffffff',
    },
  }

  const colors = themeColors[theme]

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t, colors, themeColors }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
