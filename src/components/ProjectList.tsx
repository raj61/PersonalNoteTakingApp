import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  selectedProjectId: string | null;
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onSelectProject: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  selectedProjectId, 
  onAddProject, 
  onDeleteProject, 
  onSelectProject 
}) => {
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName.trim(),
        description: '',
      };
      onAddProject(newProject);
      setNewProjectName('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add a new project"
        />
        <button onClick={handleAddProject} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center space-x-2">
            <button
              onClick={() => onSelectProject(project.id)}
              className={`flex-grow text-left p-2 rounded ${
                project.id === selectedProjectId ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              {project.name}
            </button>
            <button onClick={() => onDeleteProject(project.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;