import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon, faSun, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import ProjectModal from "../components/ProjectModal";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([{ id: 1, name: "Project A" }]);
  const [selectedProject, setSelectedProject] = useState(1);
  const [tasks, setTasks] = useState([
    { id: 1, projectId: 1, title: "Task 1", completed: false, dueDate: "2025-10-25", priority: "High" },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [theme, setTheme] = useState("light");
  const [dueSoonCount, setDueSoonCount] = useState(0);

  // Drag and reorder tasks
  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    setTasks(prevTasks => {
      const projectTasks = prevTasks.filter(t => t.projectId === selectedProject);
      const otherTasks = prevTasks.filter(t => t.projectId !== selectedProject);

      const [movedTask] = projectTasks.splice(sourceIndex, 1);
      projectTasks.splice(destinationIndex, 0, movedTask);

      return [...otherTasks, ...projectTasks];
    });
  }, [selectedProject]);

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.error("Task deleted!", {
      style: {
        background: theme === "dark" ? "#3f3f46" : "#fef2f2",
        color: theme === "dark" ? "#fecaca" : "#991b1b",
      },
    });
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      toast.success("Task updated!", {
        style: {
          background: theme === "dark" ? "#1f2937" : "#ecfdf5",
          color: theme === "dark" ? "#d1fae5" : "#065f46",
        },
      });
    } else {
      setTasks([...tasks, { ...task, id: Date.now(), projectId: selectedProject }]);
      toast.success("Task added!", {
        style: {
          background: theme === "dark" ? "#1f2937" : "#ecfdf5",
          color: theme === "dark" ? "#d1fae5" : "#065f46",
        },
      });
    }
  };

  const handleSaveProject = (project) => {
    if (project.id) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
      toast.success("Project updated!", {
        style: {
          background: theme === "dark" ? "#1f2937" : "#ecfdf5",
          color: theme === "dark" ? "#d1fae5" : "#065f46",
        },
      });
    } else {
      const newProject = { id: Date.now(), name: project.name };
      setProjects([...projects, newProject]);
      toast.success(`Project "${project.name}" added!`, {
        style: {
          background: theme === "dark" ? "#1f2937" : "#ecfdf5",
          color: theme === "dark" ? "#d1fae5" : "#065f46",
        },
      });
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  // Count tasks due soon
  useEffect(() => {
    const now = new Date();
    const soonTasks = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const diffDays = (new Date(task.dueDate) - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 3;
    });
    setDueSoonCount(soonTasks.length);
  }, [tasks]);

  const tasksForProject = tasks.filter(t => t.projectId === selectedProject);
  const activeTasks = tasksForProject.filter(t => !t.completed);
  const completedTasks = tasksForProject.filter(t => t.completed);
  const totalTasks = tasksForProject.length;

  return (
    <div className={`dashboard ${theme === "dark" ? "dark" : ""}`}>
      <div className="container">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Task Manager</h1>
            <p className="dashboard-tasks-subtitle">Organize work by project and priority.</p>
          </div>
          <div className="header-controls">
            {dueSoonCount > 0 && (
              <div className="dashboard-notification">
                <FontAwesomeIcon icon={faBell} />
                <span>Due soon: {dueSoonCount}</span>
              </div>
            )}
            <button className="btn btn-secondary dashboard-theme-toggle" onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} /> {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Project List */}
          <div className="dashboard-projects">
            <ProjectList
              projects={projects}
              selectedProjectId={selectedProject}
              onSelect={setSelectedProject}
              onAddProject={handleAddProject}
              onEdit={project => { setEditingProject(project); setIsProjectModalOpen(true); }}
              onDelete={id => {
                setProjects(projects.filter(p => p.id !== id));
                toast.success("Project deleted!", {
                  style: {
                    background: theme === "dark" ? "#3f3f46" : "#fef2f2",
                    color: theme === "dark" ? "#fecaca" : "#991b1b",
                  },
                });
              }}
            />
          </div>

          {/* Tasks */}
          <div className="dashboard-tasks card">
            <div className="dashboard-tasks-header">
              <div>
                <h2>Tasks</h2>
                <p className="dashboard-tasks-subtitle">
                  {activeTasks.length} active · {completedTasks.length} completed · {totalTasks} total
                </p>
              </div>
              <button className="btn btn-primary dashboard-add-task-btn" onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
                <FontAwesomeIcon icon={faPlus} /> Add Task
              </button>
            </div>

            <div className="dashboard-active-tasks">
              <h3>Active Tasks</h3>
              <TaskList
                tasks={activeTasks}
                onToggleComplete={toggleComplete}
                onDragEnd={handleDragEnd}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            {completedTasks.length > 0 && (
              <div className="dashboard-completed-tasks">
                <div className="completed-header">
                  <h3>Completed Tasks</h3>
                  <button className="btn btn-ghost dashboard-completed-toggle" onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? "Hide completed" : "Show completed"}
                  </button>
                </div>

                <AnimatePresence>
                  {showCompleted && (
                    <motion.div
                      key="completed-list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <TaskList
                        tasks={completedTasks}
                        onToggleComplete={toggleComplete}
                        onDragEnd={handleDragEnd}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
          projects={projects}
        />

        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={handleSaveProject}
          project={editingProject}
        />
      </div>
    </div>
  );
};

export default Dashboard;
