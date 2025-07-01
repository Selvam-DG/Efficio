import heroImg from '../assets/hero1.png'; 
import { motion } from "framer-motion";

export default function Homepage() {
    return ( 
        <div className="pt-20 text-center px-6">
            <motion.h1 initial= {{ opacity:0,y:-70}} animate = {{opacity:1, y:0}} transition={{duration:2}} className=" text-4xl font-bold mb-4">

            Welcome to Efficio - Project Management Hub
            </motion.h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                 Organize projects, assign tasks, track progress, and collaborate as a team. All in one sleek tool.
            </p>

            <motion.img src={heroImg} alt="Efficio Preview" className="mx-auto rounded shadow-lg w-250"
                initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}/>

        </div>
    );
    
};
