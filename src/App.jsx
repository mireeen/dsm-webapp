import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
<<<<<<< Updated upstream
=======
import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import Legal from './pages/Legal'
import { Route, Routes } from 'react-router'

>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
<<<<<<< Updated upstream
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
      <Header />

      
        <Routes>
          <Route path='/' element={<Catalogo />}></Route>
          <Route path='/Contacto' element={<Contacto />}></Route>
          <Route path='/Legal' element={<Legal />}></Route>

        </Routes>

      <Footer />

>>>>>>> Stashed changes
    </>
  )
}

export default App
