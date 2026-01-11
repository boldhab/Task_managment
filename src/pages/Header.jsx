import React, { useEffect, useState } from "react";
import"../styles/header.css"
const Header = ({ projects }) => {
  const [dueSoonCount, setDueSoonCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const soonTasks = projects.flatMap(p => p.tasks)
      .filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        const diffDays = (dueDate - now) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 3; // within 3 days
      });
    setDueSoonCount(soonTasks.length);
  }, [projects]);

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <h1 className="text-xl font-semibold">Task Manager</h1>

      {dueSoonCount > 0 && (
        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full flex items-center gap-2">
          <span>🔔</span>
          <span>{dueSoonCount} task{dueSoonCount > 1 ? "s" : ""} due soon!</span>
        </div>
      )}
    </header>
  );
};

export default Header;
