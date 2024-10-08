import React, { useState } from 'react';
import { Todo, Project } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  projects: Project[];
  selectedProjectId: string | null;
  onAddTodo: (todo: Todo) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  projects, 
  selectedProjectId, 
  onAddTodo, 
  onToggleTodo, 
  onDeleteTodo 
}) => {
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTodo = () => {
    if (newTodoText.trim() && selectedProjectId) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        date: selectedDate,
        projectId: selectedProjectId,
      };
      onAddTodo(newTodo);
      setNewTodoText('');
    }
  };

  const filteredTodos = todos.filter(
    todo => todo.projectId === selectedProjectId && todo.date === selectedDate
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add a new todo"
          disabled={!selectedProjectId}
        />
        <button 
          onClick={handleAddTodo} 
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!selectedProjectId}
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodo(todo.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => onDeleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;