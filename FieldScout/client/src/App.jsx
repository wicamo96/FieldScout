import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'

function App() {

  return (
    <>
      <Routes >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
