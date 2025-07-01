import React, {useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute ( {children}) {
    const { accessToken, loading } = useContext(AuthContext);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    
    return accessToken? children :  <Navigate to="/login" replace/>;
   
}