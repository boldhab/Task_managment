<div align="center">

# Task Manager (React + Vite)

Modern, lightweight frontend for managing projects and tasks with a clean dashboard, intuitive modals, drag-and-drop task ordering, and helpful notifications.

</div>

## Overview

This project is a React application scaffolded with Vite. It provides:

- Project lists and task lists with modal-based create/edit forms
- Drag-and-drop (powered by `@hello-pangea/dnd`) for task ordering
- Animated UI interactions via `framer-motion`
- Toast notifications (`react-hot-toast`) for user feedback
- Routing with `react-router-dom`
- Icon support via `lucide-react`, `@fortawesome/*`, and `react-icons`

## Tech Stack

- React 19 + Vite 7
- ESLint for linting
- CSS styles in `src/styles/*`
- Key libraries: `@hello-pangea/dnd`, `framer-motion`, `react-hot-toast`, `react-router-dom`

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm 9+ (or use pnpm/yarn if preferred)

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

By default, Vite runs on http://localhost:5173 (the port may vary if busy).

### Lint

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
task-manager/
	eslint.config.js
	index.html
	package.json
	README.md
	vite.config.js
	public/
	src/
		App.css
		App.jsx
		index.css
		main.jsx
		assets/
		components/
			ProjectList.jsx
			ProjectModal.jsx
			TaskList.jsx
			TaskModal.jsx
			tasks/
				tasklist.jsx
		pages/
			Dashboard.jsx
			Header.jsx
		styles/
			dashboard.css
			header.css
			ProjectList.css
			projectmodal.css
			tasklist.css
			taskmodal.css
```

### Key Files

- `src/pages/Dashboard.jsx`: Main dashboard view
- `src/components/ProjectList.jsx`: Project listing UI
- `src/components/TaskList.jsx`: Task listing UI
- `src/components/ProjectModal.jsx` / `src/components/TaskModal.jsx`: Create/edit modals
- `src/main.jsx`: App bootstrap with React and routing
- `src/App.jsx`: Root component

## Usage Notes

- Drag-and-drop: Tasks in lists can be reordered via `@hello-pangea/dnd`.
- Animations: Modal transitions and micro-interactions use `framer-motion`.
- Notifications: Success/error feedback via `react-hot-toast`.
- Routing: Pages navigated with `react-router-dom`.

## Scripts

The following npm scripts are available (from `package.json`):

- `dev`: Start Vite dev server
- `build`: Create production bundle
- `preview`: Serve the built app for local preview
- `lint`: Run ESLint on the codebase

## Deployment

1. Build the app with `npm run build`.
2. Deploy the generated `dist/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

No license is specified. If you intend to open-source, consider adding a suitable `LICENSE` file (MIT, Apache-2.0, etc.).
"# Task_managment" 
