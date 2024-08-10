import React, { useState } from "react";
import { Task } from "../types";
interface TaskFormProps {
  onSave: (task: Omit<Task, "id">) => Promise<void>;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, task }) => {
  const [title, setTitle] = useState<string>(task ? task.title : "");
  const [description, setDescription] = useState<string>(
    task ? task.description : ""
  );
  const [status, setStatus] = useState<string>(task ? task.status : "To Do");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="Timeout">Timeout</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
