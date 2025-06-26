import { useEffect, useState } from "react";

export default function Dashboard(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access');
        
        fetch('http://localhost:8000/api/projects/',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })

        .then((res) =>{
            if (!res.ok) throw new Error('Unauthorized');
            return res.json;
        })
        .then((data) => setTasks(data))
        .catch(() => {
            alert('Please log in again');
            window.location.href = '/';

        });
    }, []);
    return (
        
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Your Tasks</h1>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                    >
                    Logout
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Project</h1>
            <ul className="space-y-2">
                {tasks.map((task) =>(
                    <li key={task.id} className="p-4 bg-gray-100 rounded shadow"> <strong>{task.name}- {task.owner}</strong></li>
                ))}
            </ul>
        </div>
    )
}