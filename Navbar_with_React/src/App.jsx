import  { useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import './App.css'
import { useState } from 'react'
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import New from "./Pages/New"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  let currentTheme = localStorage.getItem("currentTheme")
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'dark')

  useEffect(() => {
    // Set the current theme in localStorage
    localStorage.setItem("currentTheme", theme)
  }, [theme]) // Update localStorage when the theme changes

  return (
    <div className={`container ${theme === "dark" ? "dark" : "light"}`}>
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/new' element={<New />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
