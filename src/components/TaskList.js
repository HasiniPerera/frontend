import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h1>TODO List</h1>
      <Link to="/new" className="btn btn-primary mb-3">Add New</Link>
      <div className="list-group">
        {tasks.map((task) => (
          <div key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>Due Date: {task.dueDate}</p>
            <Link to={`/task/${task.id}`} className="btn btn-info mr-2">Read more</Link>
            <Link to={`/edit/${task.id}`} className="btn btn-warning mr-2">Edit</Link>
            <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
