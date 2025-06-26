import { BrowserRouter as Router, Route, Routes,Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function Nav(){
  const navigate = useNavigate();
  const logout =() =>{
    localStorage.clear();
    navigate('/');
  };
  const login = () =>{
    navigate('/login');
  }
  return(
   
    <nav className="bg-gray-800 text-white p-4 ">
      
        <div className="grid grid-cols-2">
          <div className=" text-xl flex justify-content-start ms-10">
            <Link to="/" className=" ">Project Wise</Link>
    	    </div>
        
        
          <div className=" flex justify-evenly">
            <button> <Link to="/projects" className="font-bold me-10 ">Projects</Link></button>
            <button><Link to="/tasks" className="font-bold ">Tasks</Link></button>
            <button onClick={login} className="font-bold">Login</button>
            <button className=" font-bold" onClick={logout}>Logout</button>
        </div>

        </div>
     
      
      
    </nav>
  )
}

function App(){
  const { projectId } = useParams();
  return(
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/projects" element = {<Projects/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/tasks" element= {<Tasks/>} />
        <Route path="projects/:projectId/tasks" element= {<Tasks/>} />
      </Routes>
    </Router>
  );
}

export default App;
