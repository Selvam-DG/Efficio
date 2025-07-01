import React, { useState, useContext  } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login(){
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [error, setError ] = useState(null);

    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            await login (username,password);
            navigate('/dashboard');
        }catch{
            setError ('Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md w-full max-w-sm ">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {error && <p className='mb-4 text-red-600'>{error}</p>}
                           
                <input type="text" className="w-full border p-2 rounded mb-4 " value={username} placeholder="Username" onChange={ e => setUsername(e.target.value) } required/>
                <input type="password" className="w-full border p-2 rounded mb-6" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
            </form>

        </div>

        
    );
}