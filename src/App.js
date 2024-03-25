import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';


//Authentication component
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Resend from "./components/resendverification/Resend";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import ResetPassword from "./components/resetpassword/ResetPassword";


//App component
import DisplayNavbar from "./components/navbar/DisplayNavbar";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Note from "./components/note/Note";





function App() {

  const isLoggedIn  = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('token', token);
  },[isLoggedIn,token])


  const location = useLocation();
  const isPasswordReset = location.pathname.startsWith('/password-reset');




  return (
    <>
      <DisplayNavbar>
        {isPasswordReset ? null : <Navbar />}
      </DisplayNavbar>

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" exact element={<Login /> } />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/resend" exact element={<Resend />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/password-reset/:userId/:token" exact element={<ResetPassword />} />



        <Route path="/profile/:activepage" exact element={isLoggedIn ? <Profile/> : <Navigate to="/login"/>} />
        <Route path="/note" exact element={isLoggedIn ? <Note/> : <Navigate to="/login"/>} />
        <Route path="/dashboard/*" exact element={isLoggedIn ? <Dashboard/> : <Navigate to="/login"/>} />



      </Routes>
    </>
  );
}

export default App;