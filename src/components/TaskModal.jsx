import React, { useState, useEffect } from "react";
import "../styles/taskmodal.css";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "Low");
    } else {
      setTitle("");
      setDueDate("");
      setPriority("Low");
    }
    setError("");
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onSave({
      ...task,
      title: title.trim(),
      dueDate,
      priority,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" role="presentation">
      <div className="modal-panel" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{task ? "Edit task" : "Add task"}</h2>
          <p className="modal-subtitle">Provide the core details for this task.</p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="task-title">
              Title
            </label>
            <input
              id="task-title"
              className="input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g., Prepare quarterly review"
              required
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="task-due-date">
              Due date
            </label>
            <input
              id="task-due-date"
              className="input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <span className="helper-text">Optional</span>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="task-priority">
              Priority
            </label>
            <select
              id="task-priority"
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
