// pages/About.jsx
export default function About() {
  return (
    <div className="pt-20 px-6 max-w-3xl mx-auto text-gray-700">
      <h2 className="text-3xl font-semibold mb-4">About Efficio</h2>
      <p className="mb-4">Efficio is a project management tool designed for productivity-focused teams. Features include:</p>
      <ul className="list-disc list-inside">
        <li>Create and manage projects</li>
        <li>Assign tasks to team members</li>
        <li>Track status and priorities</li>
        <li>Comment, collaborate, and document progress</li>
      </ul>
      <p className="mt-4">Built with Django REST & React + Vite.</p>

      <div className="col-span-2">
                    
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
  );
}
