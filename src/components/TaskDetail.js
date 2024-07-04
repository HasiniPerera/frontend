import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

const TaskDetail = ({ allTodos, setTodos, handleDeleteTodo, handleComplete }) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(allTodos[id].title);
  const [editedDescription, setEditedDescription] = useState(allTodos[id].description);

  const handleUpdateTitle = (value) => {
    setEditedTitle(value);
  };

  const handleUpdateDescription = (value) => {
    setEditedDescription(value);
  };

  const handleUpdateToDo = () => {
    const updatedTodo = {
      ...allTodos[id],
      title: editedTitle,
      description: editedDescription,
    };
    let newToDo = [...allTodos];
    newToDo[id] = updatedTodo;
    setTodos(newToDo);
    setIsEditing(false);
  };

  return (
    <div className="task-detail-wrapper">
      <div className="todo-list-item">
        {!isEditing ? (
          <div className="task-content">
            <h3 className="task-title">{allTodos[id].title}</h3>
            <p className="task-description">{allTodos[id].description}</p>
          </div>
        ) : (
          <div className="edit__wrapper">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              className="task-detail-input"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => handleUpdateDescription(e.target.value)}
              className="task-detail-input"
            />
          </div>
        )}
        <div className="icon-actions">
          <button onClick={() => handleComplete(id)}>
            <BsCheckLg className="check-icon" title="Mark as Completed" />
          </button>
          <button onClick={() => handleDeleteTodo(id)}>
            <AiOutlineDelete className="icon" title="Delete Task" />
          </button>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>
              <AiOutlineEdit className="icon" title="Edit Task" />
            </button>
          ) : (
            <button onClick={handleUpdateToDo}>
              <AiOutlineEdit className="icon" title="Save Changes" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
