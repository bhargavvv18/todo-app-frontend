import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; 
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const baseURL = 'https://todo-app-backend-z62u.onrender.com';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks(); 
  };

  const handleTaskUpdate = () => {
    fetchTasks(); 
    setSelectedTask(null);
    
  };

 

  return (
    <div className="app-container">
      <h1 className="app-heading">ToDo List</h1>
      <TaskForm
        onTaskAdded={handleTaskAdded}
        selectedTask={selectedTask}
        onUpdateTask={handleTaskUpdate}
        baseURL={baseURL}
      />
      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          baseURL={baseURL}
        />
      </div>
    </div>
  );
}

export default App;
