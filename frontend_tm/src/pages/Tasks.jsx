import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const taskURL = "http://localhost:8000/api/tasks/";

export default function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editIsComplete, setEditIsComplete] = useState(false);

  useEffect(() => {
     fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    const res = await fetchWithAuth(`http://localhost:8000/api/projects/${projectId}/tasks/`);
    // const res = await fetchWithAuth(taskURL);
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    const res = await fetchWithAuth(`http://localhost:8000/api/projects/${projectId}/tasks/`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        due_date: dueDate || null,
      }),
    });
    console.log(res)
    if (res.ok) {
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchTasks();
    } else {
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    const res = await fetchWithAuth(`${taskURL}${id}/`, { method: "DELETE" });
    if (res.ok) {
      setTasks(tasks.filter((t) => t.id !== id));
    } else {
      alert("Failed to delete task");
    }
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.due_date || "");
    setEditIsComplete(task.is_complete);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDueDate("");
    setEditIsComplete(false);
  };

  const saveEdit = async () => {
    const res = await fetchWithAuth(`${taskURL}${editId}/`, {
      method: "PUT",
      body: JSON.stringify({
        project: projectId,
        title: editTitle,
        description: editDescription,
        due_date: editDueDate || null,
        is_complete: editIsComplete,
      }),
    });
    if (res.ok) {
      fetchTasks();
      cancelEdit();
    } else {
      alert("Failed to update task");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
        
        <h1 className="text-2xl font-bold mb-4">Tasks for Project {projectId}</h1>

        <form onSubmit={createTask} className="mb-6 space-y-2 border p-4 rounded bg-gray-100">
        <input
            required
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-1 w-full"
        />
        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-1 w-full"
        />
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded px-3 py-1 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
            Add Task
        </button>
        </form>

        <ul className="space-y-3">
        {Array.isArray(tasks) && tasks.map((task) => (
            <li key={task.id} className="p-4 bg-gray-200 rounded">
            {editId === task.id ? (
                <>
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border rounded px-2 py-1 w-full mb-1"
                />
                <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border rounded px-2 py-1 w-full mb-1"
                />
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="border rounded px-2 py-1 mb-1"
                />
                <label className="inline-flex items-center space-x-2 mb-2">
                    <input
                    type="checkbox"
                    checked={editIsComplete}
                    onChange={(e) => setEditIsComplete(e.target.checked)}
                    className="form-checkbox"
                    />
                    <span>Completed</span>
                </label>
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                    Save
                </button>
                <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
                </>
                ) : (
                <>
                    <h3 className={`font-semibold ${task.is_complete ? "line-through" : ""}`}>{task.title}</h3>
                    <p>{task.description}</p>
                    <p className="text-sm text-gray-700">Due: {task.due_date || "None"}{task.project}{task.user}</p>
                    <div className="mt-2">
                        <button onClick={() => startEdit(task)} className="bg-gray-600 text-white px-2 py-1 rounded mr-2">
                        Edit
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                        </button>
                    </div>
                </>
                 )}
                </li>
            ))}
        </ul>
    </div>
    );
    }
