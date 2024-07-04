// src/components/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>TODOList</h1>
      <button onClick={() => setShowForm(true)}>Add New</button>
      {showForm && <TaskForm onSave={handleAdd} />}
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>Due Date: {task.dueDate}</p>
            <Link to={`/task/${task.id}`}><button>Read more</button></Link>
            <button onClick={() => setShowForm(true)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
