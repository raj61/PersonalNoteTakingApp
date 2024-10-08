import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { Save } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onSaveNote: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSaveNote }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setContent(note.content);
    } else {
      setContent('');
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      onSaveNote({
        ...note,
        content,
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  if (!note) {
    return <div className="text-center text-gray-500">Select a project to start taking notes</div>;
  }

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-2 border rounded"
        placeholder="Start typing your notes here..."
      />
      <button onClick={handleSave} className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <Save size={20} />
        <span>Save Note</span>
      </button>
    </div>
  );
};

export default NoteEditor;