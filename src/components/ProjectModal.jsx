import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/projectmodal.css";

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) setName(project.name || "");
    else setName("");
    setError("");
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }
    onSave({ ...project, name: name.trim() });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-header">
              <h2 className="modal-title">{project ? "Edit project" : "Add project"}</h2>
              <p className="modal-subtitle">Use a short, descriptive name.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label" htmlFor="project-name">
                  Project name
                </label>
                <input
                  id="project-name"
                  className="input"
                  type="text"
                  placeholder="e.g., Client onboarding"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  required
                />
                {error && <span className="form-error">{error}</span>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save project
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
