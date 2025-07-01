import React, { createContext, useState, useEffect} from "react";
import axios from '../services/axios';
// import  { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider ( {children}){
    // const navigate = useNavigate();
 
    const [ accessToken, setAccessToken ] = useState( localStorage.getItem('access'));
    const [ loading, setLoading ] = useState(true);

    // Load user info if token in local storage

    useEffect( () => {
        const token = localStorage.getItem('access');
        if (token){
            setAccessToken(token);
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
        console.log(username, password);
        try {
            const result = await axios.post('/auth/login/', {
                username: username,
                password: password});
            console.log(result);
            localStorage.setItem('access', result.data.access);
            localStorage.setItem('refresh', result.data.refresh);
            setAccessToken(result.data.access);
            
            // navigate('/dashboard');
        } catch(error){
            console.error("Login Failed", error.response?.data);
            throw new Error( 'Login Failed');
        }

    };

   const register = async (username, password, email, full_name, role="developer") => {
    try{
        await axios.post('/auth/register/'), {
                username,
                password,
                email,
                full_name,
                role,
            };

            await login(username, password);
        }catch(error) {
            console.error("Registration Failed", error.response?.data);
            throw new Error('Registration Failed');
        }
    };

   const logout = () => {
    localStorage.removeItem('access');
    setAccessToken(null);
   
    // navigate('/login');
   };

   return (
    <AuthContext.Provider value={ {accessToken, login, logout, register, loading}}>
        {children}
    </AuthContext.Provider>
   );
} 