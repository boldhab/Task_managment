import React, { useState, useEffect } from "react";
import "../styles/taskmodal.css"

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDueDate("");
      setPriority("Low");
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...task,
      title,
      dueDate,
      priority,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
