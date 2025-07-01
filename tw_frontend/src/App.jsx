import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path ="/" element= { <Homepage/> } />
          <Route path ="/about" element= { <About/> } />
          <Route path="/login" element= { <Login />}/>
          <Route path="/register" element ={ <Register/>} />
          <Route path="/dashboard" element = { <ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
          <Route path ="" element= { <Login/> } />
        </Routes>
      
      </AuthProvider>
    </BrowserRouter>
  );
}