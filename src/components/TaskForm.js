import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: false
  });

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const response = await axios.get(`/api/tasks/${id}`);
    setTask(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/tasks/${id}`, task);
    } else {
      await axios.post("/api/tasks", task);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Edit Task" : "Create Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
