import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/navbar'


function App() {

  return (
    <>
    <Navbar></Navbar>
    <Home></Home>
    </>
    
  )
}

export default App
