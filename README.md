# Collapsible Tree Explorer

A modern, interactive React-based tree visualization component that enables users to explore hierarchical data structures with smooth animations and intuitive navigation controls.

<div style="display: flex; justify-content: center; margin: 30px 0;">
  <img src="./screenshots/project.png" alt="Collapsible Tree Explorer" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" />
</div>

## Table of Contents

- [Collapsible Tree Explorer](#collapsible-tree-explorer)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
    - [Directory Descriptions](#directory-descriptions)
  - [Framework \& Why](#framework--why)
  - [How to Run the Project](#how-to-run-the-project)
  - [Setup Instructions (Docker)](#setup-instructions-docker)
  - [Technologies](#technologies)
  - [License](#license)

## Features

- **Interactive Tree Visualization**: Explore hierarchical data with an intuitive, collapsible tree interface
- **Dynamic Node Management**: Add, edit, delete, and manage tree nodes dynamically
- **Modal Dialogs**: Dynamic modals for enhanced user interactions
- **JSON Preview**: Real-time JSON data preview of selected nodes
- **Breadcrumb Navigation**: Easy navigation through tree hierarchy
- **Node Actions**: Context-aware actions for tree manipulation
- **Local Storage Support**: Persistent data storage using browser local storage
- **Responsive Viewport**: Dedicated viewport for data display and exploration
- **Smooth Animations**: Elegant transitions and animations for expanding/collapsing nodes
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Accessibility**: Built with accessibility best practices
- **Container Ready**: Includes Docker configuration for easy deployment

## Project Structure

```
collapsible-tree-explorer/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── modal/
│   │   │   └── DynamicModal.jsx
│   │   ├── NodeActions/
│   │   │   ├── IconButton.jsx
│   │   │   └── NodeActions.jsx
│   │   ├── tree/
│   │   │   ├── Tree.jsx
│   │   │   └── TreeNode.jsx
│   │   ├── viewport/
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── JSONPreview.jsx
│   │   │   └── Viewport.jsx
│   │   ├── Button.jsx
│   │   └── Toolbar.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── treeUtils.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── reportWebVitals.js
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── postcsss.config.js
├── README.md
└── tailwind.config.js
```

### Directory Descriptions

- **components/**: Reusable React components organized by feature
  - **modal/**: Modal dialogs for dynamic operations
  - **NodeActions/**: Components for tree node actions and interactions
  - **tree/**: Core tree visualization components
  - **viewport/**: Data display and navigation components
- **hooks/**: Custom React hooks for state management
- **utils/**: Utility functions for tree operations and helpers
- **public/**: Static assets and HTML template
- **src/**: Main source code directory

## Framework & Why

**React 18** was chosen as the primary framework for this project because:

- **Component-Based Architecture**: React's component model allows for reusable, modular code that makes the tree explorer scalable and maintainable
- **Virtual DOM**: React's virtual DOM ensures efficient rendering and smooth animations when expanding/collapsing tree nodes
- **State Management**: Built-in hooks like `useState` and custom hooks simplify state management for tree navigation and local storage
- **Ecosystem**: Rich ecosystem with Tailwind CSS for styling and excellent developer tools for debugging
- **Performance**: React's optimization techniques handle large hierarchical datasets efficiently
- **Community Support**: Extensive documentation and community support make development faster and more reliable

## How to Run the Project

Refer to the setup instructions below for detailed steps.

Visit the live demo hosted on Vercel:

[https://collapsible-tree-explorer.vercel.app](https://collapsible-tree-explorer.vercel.app)

---

- Clone the repository:

```bash
git clone https://github.com/yourusername/collapsible-tree-explorer.git
```

- Go to the project directory:

```bash
cd collapsible-tree-explorer
```

- Install required packages:

```bash
npm install
```

- Run the development server:

```bash
npm start
```

The application will automatically open in your default browser at `http://localhost:3000`. Any changes you make to the code will automatically refresh the page.

This creates an optimized production build in the `build/` directory with minified JavaScript and CSS, code splitting, and optimized assets.

---

## Setup Instructions (Docker)

- Build and run Docker images:

```bash
docker-compose up --build
```

- Run the Docker container using docker-compose:

```bash
docker-compose up
```

- Stop Docker when finished:

```bash
docker-compose down
```

- Docker is running properly! Access the application at `http://localhost:3000`

## Technologies

This project is built with the following technologies:

- **React 18**: Modern UI library for building interactive components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **npm**: Package manager
- **Docker**: Containerization platform for development and deployment
- **Local Storage API**: Browser API for persistent data storage

## License

This project is licensed under the MIT License - see the LICENSE file for details.
