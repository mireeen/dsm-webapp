
import './App.css'

import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import Legal from './pages/Legal'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Registro from './pages/Registro'
import { useContext, useEffect, useState } from 'react'
import AuthContext from './components/store/AuthContext'
import { AuthProvider } from './components/store/AuthContext'
import FichaDetalle from './components/fichadetalle'

function App() {



    const auth = useContext(AuthContext)


  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      auth.setAuthData(true, localStorage.getItem('idToken'))
    }
  }, [])


  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Catalogo />}></Route>
          <Route path='/Contacto' element={<Contacto />}></Route>
          <Route path='/Legal' element={<Legal />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Registro' element={<Registro />}></Route>
          <Route path='/pelicula/:id' element={<FichaDetalle />}></Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
