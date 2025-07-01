import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register(){
    const {register } = useContext(AuthContext);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [fullName, setFullName] = useState('');
    const [ role, setRole ] = useState('developer');
    const [error, setError ] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await register(username, password, email,fullName);
            
        }catch {
            setError ('Registration failed');
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
                {error && <p className="mb-4 text-red-600">{error}</p>}
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="mb-4 w-full p-2 border rounded" required/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 w-full p-2 border rounded" required/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 w-full p-2 border rounded" required/>
                <input type="text" placeholder="Full Name" value = {fullName} onChange={e => setFullName(e.target.value)}  className="mb-4 w-full p-2 border rounded" />
                <select value={role} onChange={e => setRole(e.target.value)} className="mb-4 w-full p-2 border rounded">
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                    <option value="tester">Tester</option>
                    <option value="stakeholder">Stakeholder</option>
                </select>
                <button className="w-fill bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>

            </form>
        </div>

    );


}