import React, { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskUpdate }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const baseURL = 'https://todo-app-backend-d5t0.onrender.com';

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = async (taskId, newText) => {
    try {
      const response = await axios.patch(`${baseURL}/updatetask/${taskId}`, {
        _id: taskId,
        text: newText,
      });
      console.log('Task updated:', response.data);
      onTaskUpdate();
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseURL}/deletetask/${taskId}`);
      console.log('Task deleted:', taskId);
      onTaskUpdate();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          {selectedTask && selectedTask._id === task._id ? (
            <div className="update-task">
              <input
                type="text"
                value={selectedTask.text}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, text: e.target.value })
                }
              />
              <button className="update-button" onClick={() => handleUpdateTask(selectedTask._id, selectedTask.text)}>
                Update
              </button>
              <button className="cancel-button" onClick={() => setSelectedTask(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <span className="task-text">{task.text}</span>
              <div className="task-icons">
                <button className="update-button" onClick={() => handleUpdateClick(task)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
