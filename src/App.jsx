import './App.css'

import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import Legal from './pages/Legal'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Registro from './pages/Registro'
import { AuthProvider } from './components/store/AuthContext'
import FichaDetalle from './components/fichadetalle'
import Favoritos from './pages/Favoritos'

function App() {
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
          <Route path='/favoritos' element={<Favoritos />}></Route>

        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
