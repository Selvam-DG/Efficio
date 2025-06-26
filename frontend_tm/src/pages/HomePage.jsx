export default function HomePage(){

    return(
        <div>
        
            <div className="grid grid-cols-3 ">
                <div className="col-span-2">
                    <div class="h-screen  bg-green-50 p-5">
                        <div className="flex-1 ">
                            <h1 className="text-5xl font-bold mb-4">Welcome to Project Wise</h1>
                            <p className="text-lg text-gray-700 mb-6">
                            A simple, powerful tool to manage your team’s work, deadlines, and productivity — all in one place.
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Get Started
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white shadow p-4 rounded">
                                <h3 className="font-bold text-xl mb-2">📋 Task Management</h3>
                                <p>Create, edit, assign, and track tasks easily.</p>
                            </div>
                            <div className="bg-white shadow p-4 rounded">
                                <h3 className="font-bold text-xl mb-2">📅 Deadlines</h3>
                                <p>Set due dates and stay on top of your work.</p>
                            </div>
                            <div className="bg-white shadow p-4 rounded">
                                <h3 className="font-bold text-xl mb-2">👥 Team Collaboration</h3>
                                <p>Work together and share updates in real time.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="h-screen bg-pink-100 bg-opacity-25 ">
                    test2
                </div>

            </div>
            
        
        </div>
    );
}