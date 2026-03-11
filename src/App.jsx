
import './App.css'

import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import Legal from './pages/Legal'
import { Route, Routes } from 'react-router'

import Pelicula from './components/Pelicula'
import Catalogo from './components/Catalogo'

function App() {
  return (

    <>

      <Header />

      
        <Routes>
          <Route path='/' element={<Catalogo />}></Route>
          <Route path='/Contacto' element={<Contacto />}></Route>
          <Route path='/Legal' element={<Legal />}></Route>

        </Routes>

      <Footer />

    </>
  )
}

export default App
