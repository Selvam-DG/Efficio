import { useState } from "react";

export default function LoginPage(){
    const [formData, setFormData] = useState({username:'', password:''});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const login = async(e) =>{
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/token/', {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body :JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok){
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refersh);
            window.location.href = '/projects';
        }else{
            alert('Login failed');
        }
    };

    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={login} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className = "text-xl font-bold mb-4">Login To your Task Manager</h2>
                <input name="username" onChange={handleChange} placeholder="Username" className="w-full mb-3 p-2 border rounded" />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full mb-3 p-2 border rounded"/>
                <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>

    );
}