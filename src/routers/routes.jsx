import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home, Login, ProtectedRoutes, UserAuth } from '../index'

export const MyRoutes = () => {
  const { user } = UserAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route 
        element={<ProtectedRoutes user={user}
        redirectTo="/login" />}         
      >
        <Route path ="/" element={<Home/>} />
      </Route>            
    </Routes>
  )
}
