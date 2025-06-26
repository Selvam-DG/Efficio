import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import {Link } from "react-router-dom"


const projectURL = 'http://localhost:8000/api/projects/'

export default function Projects(){
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    // Fetch all projects on Load
    useEffect(() =>{
        fetchProjects();
    }, []);

    const fetchProjects = async() => {
        const result = await fetchWithAuth(projectURL);
        const data = await result.json();
        setProjects(data);
    };

    const createProject = async (e) => {
    e.preventDefault();
    const result = await fetchWithAuth(projectURL, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    if (result.ok) {
      setName('');
      fetchProjects(); // refresh list
    } else {
      alert('Error creating project');
    }
  };
    const deleteProject = async(id) =>{
        const del_result = await fetchWithAuth(`${projectURL}${id}/`, {
            method: 'DELETE',
        });
        if (del_result.ok){
            setProjects(projects.filter((p) => p.id !== id));
        }else{
            alert('Failed to delete Project');
        }
    };

    const startEdit = (id, currentName) => {
        setEditId(id);
        setEditName(currentName);
    };

    const cancelEdit = () =>{
        setEditId(null);
        setEditName('');
    };

    const saveEdit = async(id) =>{
        const result = await fetchWithAuth(`${projectURL}${id}/`,{
            method: 'PUT',
            body: JSON.stringify({name: editName})
        });

        if (result.ok){
            fetchProjects();
            cancelEdit();
        }else{
            alert('Failed to update project');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
            <form onSubmit={createProject} className="mb-6 flex gap-2">
                <input type="text" placeholder="New Project Name" value={name} onChange={(e) => setName(e.target.value)}  className="border rounded px-3 py-1 w-full"/>
                <button className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
            </form>
            <ul className="space-y-2">
                {Array.isArray(projects) && projects.map((project)=>(
                    <li key={project.id} className="p-4 bg-gray-100 rounded flex justify-between items-center">
                        <div>
                            {editId === project.id ? (
                                <>
                                    <input value={editName} onChange={e => setEditName(e.target.value)} className="border rounded px-2 py-1" />
                                    <button onClick={() => saveEdit(project.id)} className="ml-2 bg-green-600 text-white px-2 py-1 rounded">Save</button>
                                    <button onClick={cancelEdit} className="ml-1 bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                                </>
                            ):(
                                <Link to={`/projects/${project.id}/tasks`} className="font-semibold text-blue-700 hover:underline" >
                                {project.name} 
                                </Link>
                                
                            )}
                            <>
                                <p className="text-sm text-gray-700"> created by: {project.owner} </p>
                            </>
                        </div>
                        <div>
                            <button onClick={() => startEdit(project.id,project.name)} className="bg-gray-500 text-white px-2 py-1 mr-2 rounded">
                               Edit
                            </button>
                            <button onClick={() => deleteProject(project.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Delete
                            </button>

                        </div>
                    </li>
                    
                ))}
            </ul>

        </div>
    );
}