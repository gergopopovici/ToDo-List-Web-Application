import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListToDo from './pages/ListToDo';
import ToDoEntry from './pages/ToDoEntry';
import ToDoForm from './pages/ToDoForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthProvider';
import UserProvider from './components/UserProvider';
import ThemeProvider from './context/ThemeContext';
import './i18n';
import LanguageProvider from './context/LanguageContext';
import { UserRedirect } from './hooks/userRedirect';
import ListUsers from './pages/ListUsers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider.ThemeProvider>
          <LanguageProvider>
            <Router>
              <UserProvider>
                <UserRedirect />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<Navigate to="/toDos" />} />
                  <Route path="/toDos" element={<ListToDo />} />
                  <Route path="/todo/:id" element={<ToDoEntry />} />
                  <Route path="/create" element={<ToDoForm />} />
                  <Route path="/edit/:id" element={<ToDoForm />} />
                  <Route path="/users" element={<ListUsers />} />
                </Routes>
              </UserProvider>
            </Router>
          </LanguageProvider>
        </ThemeProvider.ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
