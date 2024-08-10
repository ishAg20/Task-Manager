import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import CategorySlider from "./components/CategorySlider";
import axios from "axios";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("To Do");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("/tasks");
    setTasks(response.data);
  };

  const handleSaveTask = async (task: Omit<Task, "id">) => {
    // Omit id when creating a new task
    if (selectedTask) {
      await axios.put(`/tasks/${selectedTask.id}`, task);
    } else {
      await axios.post("/tasks", task);
    }
    fetchTasks();
    setSelectedTask(null);
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setSelectedTask(task);
  };

  const handleDeleteTask = async (id: string) => {
    await axios.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    fetchTasksByCategory(category);
  };

  const fetchTasksByCategory = async (category: string) => {
    const response = await axios.get(`/tasks?category=${category}`);
    setTasks(response.data);
  };

  return (
    <div className="app">
      <CategorySlider
        categories={["To Do", "In Progress", "Done", "Timeout"]}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      <TaskForm onSave={handleSaveTask} task={selectedTask || undefined} />
    </div>
  );
};

export default App;
