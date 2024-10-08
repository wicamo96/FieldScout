import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Authorized } from './views/Authorized.jsx'
import { ApplicationViews } from './views/ApplicationViews.jsx'
import { BasicNavbar } from './components/navbar/BasicNavbar.jsx'

export const App = () => {

  return (
    <Routes >
      <Route path='/login' element={<><BasicNavbar /><Login /></>} />
      <Route path='/register' element={<><BasicNavbar /><Register /></>} />
      <Route path='*' element={
          <Authorized>
            <ApplicationViews/>
          </Authorized>
        } />
    </Routes>

    
  )
}
