import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Productos from './Pages/Productos.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Registro from './Pages/Registro.jsx'
import Usuarios from './Pages/Usuarios.jsx'
import Ventas from './Pages/Ventas.jsx'
import Clientes from './Pages/Clientes.jsx'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Header />
      <Navbar />
      
      <main className="main-content">
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />

        <Route 
          path='/productos' 
          element={
            <ProtectedRoute roles={['admin']}>
              <Productos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/usuarios' 
          element={
            <ProtectedRoute roles={['admin']}>
              <Usuarios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/ventas' 
          element={
            <ProtectedRoute roles={['admin','empleado']}>
              <Ventas />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/clientes' 
          element={
            <ProtectedRoute roles={['admin']}>
              <Clientes />
            </ProtectedRoute>
          } 
        />

        <Route 
        path="*" element={<h2 style={{ textAlign: 'center' }}> Página no encontrada</h2>}
        />
  </Routes>
  </main>
  <Footer />
    </BrowserRouter>
  )
}
export default App;
