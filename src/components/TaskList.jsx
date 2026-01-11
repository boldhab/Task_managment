import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import "../styles/tasklist.css";

// Helper functions
function getDueClass(dueDate) {
  if (!dueDate) return "";
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = (due - now) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return "due-date-overdue";
  if (diffDays <= 3) return "due-date-soon";
  return "due-date-normal";
}

function formatDate(dateString) {
  if (!dateString) return "No date";
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function getPriorityClass(priority) {
  switch (priority) {
    case "High":
      return "priority-high";
    case "Medium":
      return "priority-medium";
    case "Low":
    default:
      return "priority-low";
  }
}

const TaskList = ({ tasks, onToggleComplete, onDragEnd, onEditTask, onDeleteTask }) => {
  // Handle empty state
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p className="empty-title">No tasks found.</p>
        <p className="empty-subtitle">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => {
              const dueClass = getDueClass(task.dueDate);
              const priorityClass = getPriorityClass(task.priority);

              return (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`task-item ${task.completed ? 'completed' : ''} ${
                        snapshot.isDragging ? 'dragging' : ''
                      }`}
                    >
                      {/* Drag handle */}
                      <div {...provided.dragHandleProps} className="drag-handle">
                        <FontAwesomeIcon 
                          icon={faGripVertical} 
                          className="fa-icon-sm"
                        />
                      </div>

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={task.completed || false}
                        onChange={() => onToggleComplete(task.id)}
                        className="task-checkbox"
                      />

                      {/* Task content */}
                      <div className="task-content">
                        <div className="task-header">

                          <div className="task-title-info">
                            <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                            {task.title}
                            </span>

                           <div className="task-infomation">
                                <span className={`due-date ${dueClass}`}>
                                  {formatDate(task.dueDate)}
                                </span>
                                
                                <span className={`priority-badge ${priorityClass}`}>
                                  {task.priority}
                                </span>
                             </div>
                          </div>
                         
                          
                          <div className="task-meta">

                            {/* Action buttons */}
                            <div className="task-actions">
                              <button 
                                onClick={() => onEditTask(task)} 
                                className="action-btn edit"
                                aria-label={`Edit task: ${task.title}`}
                              >
                                <FontAwesomeIcon icon={faEdit} className="fa-icon-sm" />
                              </button>
                              <button 
                                onClick={() => onDeleteTask(task.id)} 
                                className="action-btn delete"
                                aria-label={`Delete task: ${task.title}`}
                              >
                                <FontAwesomeIcon icon={faTrash} className="fa-icon-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;