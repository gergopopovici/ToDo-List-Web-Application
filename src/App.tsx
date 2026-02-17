import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
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
import { apiURL } from './config/apiURl';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        // the attempt itself starts the Render server.
        console.log('Pinging server to wake it up...');
        await axios.get(`${apiURL}/todos`);
      } catch (error) {
        // Ignore errors here; we expect a 401 if not logged in.
        // The goal is just to hit the server.
        console.log('Server pinged.');
      }
    };

    wakeUpBackend();
  }, []);
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
