# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# ToDo List Web Application

# Overview

This ToDo List Web Application is a feature-rich task management system built with a Spring Boot backend and MySQL database. It supports English, Hungarian, and Romanian, provides JWT-based authentication & authorization, allows users to switch between three themes (Dark, Light, Custom), and includes advanced filtering options. The application also supports PWA capabilities, enabling offline access and installation on native devices.

# Features

# Authentication & Authorization

JWT-based login/logout system
Displays the logged-in user's information dynamically
User management handled via Spring Security and MySQL
# Theming
Three themes available: Dark, Light, and Custom
Stores the selected theme in local storage to retain preferences after refresh

# Internationalization
Supports three languages: English, Hungarian, and Romanian
Displays the currently selected language
Saves language preference in local storage

# Advanced Filtering & Search
Tasks can be filtered based on multiple criteria, including:
Priority (e.g., High, Medium, Low)
Due Date (from a specific date or within a range)

# Progressive Web App (PWA)
Uses Vite PWA plugin to enable offline capabilities
Caches static resources for better performance
Allows users to install the application on their devices via a Web App Manifest

# Technologies Used

# Frontend
React (Vite) for fast performance
Workbox for PWA support

# Backend
Spring Boot for backend logic
Spring Security & JWT for authentication
MySQL as the database

BACKEND CODE:
https://gitlab.com/bbte-mmi/idde/labs/2024/pgim2289/-/merge_requests/5#a3606ebe36505636b18edc04ec542f1978469749
https://gitlab.com/bbte-mmi/idde/labs/2024/pgim2289
