import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../styles/ProjectList.css"

const ProjectList = ({ 
  projects, 
  selectedProjectId, 
  onSelect, 
  onAddProject, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="dashboard-projects-container">

      <div className="dashboard-projects-header">
        <h2 className="dashboard-projects-title">Projects</h2>

        <button className="dashboard-add-project-btn" onClick={onAddProject}>
          <FontAwesomeIcon icon={faPlus} /> Add Project
        </button>

      </div>

      <div className="dashboard-projects-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`dashboard-project-item ${
              selectedProjectId === project.id ? "selected" : ""
            }`}
            onClick={() => onSelect(project.id)}
          >
            <span className="dashboard-project-name">
              <FontAwesomeIcon icon={faFolder} /> {project.name}
            </span>

            <div className="dashboard-project-actions">
              <button
                className="dashboard-project-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button
                className="dashboard-project-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;