import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded, selectedTask, onUpdateTask }) => {
  const [taskText, setTaskText] = useState(selectedTask ? selectedTask.text : '');
  const baseURL = 'https://todo-app-backend-d5t0.onrender.com';

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${baseURL}/addtask`, {
        text: taskText,
      });
      console.log('Task added:', response.data);
      setTaskText('');
      onTaskAdded(); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.patch(`${baseURL}/updatetask/${selectedTask._id}`, {
        _id: selectedTask._id,
        text: taskText,
      });
      console.log('Task updated:', response.data);
      onUpdateTask(); 
      setTaskText(''); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="add-task">
      <input
        type="text"
        placeholder={selectedTask ? 'Update task' : 'Add task'}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      {selectedTask ? (
        <button className="update-button" onClick={handleUpdateTask}>Update</button>
      ) : (
        <button className="add-button" onClick={handleAddTask}>Add</button>
      )}
    </div>
  );
};

export default TaskForm;
