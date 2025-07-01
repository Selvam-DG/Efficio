import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProjects } from "../services/api";

export default function Dashboard(){
    const { user } = useContext(AuthContext);
    const [ projects, setProjects ] = useState([]);

    useEffect( () => {
        getProjects()
            .then( result => setProjects(result.data));
    }, [])

    return (
        <div className="min-h-screen p-6 bg-gray-50 pt-20">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold ">Welcome, {user?.username}</h1>
            </header>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    {projects.map( project => (
                        <div className="bg-white p-4 rounded shadow hover:shadow.md transition">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p className="mt-2 text-gray-600">{project.description}</p>
                            <p className="mt-2 text-sm text-gray-500">{project.status}</p>

                        </div>
                    ))}

                </div>
            </section>

        </div>
    );
}