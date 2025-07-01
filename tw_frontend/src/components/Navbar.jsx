import { Link } from "react-router-dom";

export default function Navbar() {
    return ( 
        <nav className="flex justify-between items-center px-4 py-4 shadow bg-white fixed w-full z-50">
            <div className="text-xl font-bold text-blue-600">
                <Link to="/">Efficio</Link>
            </div>
            <div className="space-x-4">
                <Link to="/about" className="hover:text-blue-600">Docs</Link>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</Link>
            </div>
        </nav>
    );
}
