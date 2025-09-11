import React, { useEffect } from "react"
import{ Routes , Route }from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/Profile.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import { Navigate } from "react-router-dom"

const App = ()=>{
  const {checkAuth , authUser, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return(
    <div data-theme="cupcake">
      

      <Navbar/>
      {/* <button className="btn btn-primary">DaisyUI Works 🎉</button> */}

      <Routes >
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>



      <Toaster />
    </div>
    
  )



}

export default App