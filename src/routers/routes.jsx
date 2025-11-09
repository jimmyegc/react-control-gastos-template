import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { 
  Home, 
  Login, 
  ProtectedRoutes, 
  UserAuth, 
  Categorias,
  Movimientos,
  Informes,
  Configuracion,     
  MiPerfil,
} from '../index'

export const MyRoutes = () => {
  const { user } = UserAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route 
        element={<ProtectedRoutes 
        user={user} 
        redirectTo="/login"
      />}         
    >
        <Route path ="/" element={<Home/>} />
        <Route path ="/categorias" element={<Categorias />} />        
        <Route path ="/movimientos" element={<Movimientos />} />       
        <Route path ="/informes" element={<Informes />} />               
        <Route path ="/configuracion" element={<Configuracion/>} />
        <Route path = "/perfil" element={<MiPerfil />} />
      </Route>            
    </Routes>
  )
}
