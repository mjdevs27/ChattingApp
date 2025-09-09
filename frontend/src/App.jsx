import React, { useEffect } from "react"
import{ Routes , Route }from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"


const App = ()=>{
  const {checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])
  return(
    <div>
      <Navbar/>


      <Routes >
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/signup" element={ <SignUpPage/> }/>
      </Routes>

    </div>
  )



}

export default App