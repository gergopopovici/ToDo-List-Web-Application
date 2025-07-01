# ToDo List Web Application

# Overview

This ToDo List Web Application is a feature-rich task management system built with a Spring Boot backend and MySQL database. It supports English, Hungarian, and Romanian, provides JWT-based authentication & authorization, allows users to switch between three themes (Dark, Light, Custom), and includes advanced filtering options. The application also supports PWA capabilities, enabling offline access and installation on native devices.

# LIVE DEMO

https://www.youtube.com/watch?v=8gek2CtDFXw

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

# BACKEND CODE:

https://github.com/gergopopovici/ToDo-List-Backend/pull/1

https://github.com/gergopopovici/ToDo-List-Backend
