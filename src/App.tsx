import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import ProjectList from './components/ProjectList';
import NoteEditor from './components/NoteEditor';
import { Todo, Project, Note } from './types';
import { Search } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedProjects = localStorage.getItem('projects');
    const storedNotes = localStorage.getItem('notes');

    if (storedTodos) setTodos(JSON.parse(storedTodos));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [todos, projects, notes]);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    setTodos(todos.filter(todo => todo.projectId !== id));
    setNotes(notes.filter(note => note.projectId !== id));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSaveNote = (note: Note) => {
    const existingNoteIndex = notes.findIndex(n => n.id === note.id);
    if (existingNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = note;
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, note]);
    }
  };

  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedProjectId ? todo.projectId === selectedProjectId : true)
  );

  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const selectedNote = selectedProjectId 
    ? notes.find(note => note.projectId === selectedProjectId) || {
        id: Date.now().toString(),
        projectId: selectedProjectId,
        content: '',
        date: new Date().toISOString().split('T')[0],
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Developer's Personal Note-Taking App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ProjectList
              projects={projects}
              selectedProjectId={selectedProjectId}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
              onSelectProject={handleSelectProject}
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Todos</h2>
              <div className="flex items-center space-x-2 mb-4">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow p-2 border rounded"
                  placeholder="Search todos..."
                />
              </div>
              <TodoList
                todos={filteredTodos}
                projects={projects}
                selectedProjectId={selectedProjectId}
                onAddTodo={handleAddTodo}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedProject ? `Notes for ${selectedProject.name}` : 'Notes'}
              </h2>
              <NoteEditor note={selectedNote} onSaveNote={handleSaveNote} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;