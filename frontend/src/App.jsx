import React from "react"
import{ Routes , Route }from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

const App = ()=>{
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