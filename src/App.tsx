import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ListToDo from './pages/ListToDo';
import ToDoEntry from './pages/ToDoEntry';
import ToDoForm from './pages/ToDoForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ButtonClickedProvider from './Contexts/ButtonClickedProvider';
import { AuthProvider } from './Contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import UserProvider from './components/UserProvider';
import ThemeProvider from './Contexts/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ButtonClickedProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/toDos" />} />
              </Route>
              <Route
                element={
                  <ThemeProvider>
                    <UserProvider>
                      <ProtectedRoute />
                    </UserProvider>
                  </ThemeProvider>
                }
              >
                <Route path="/toDos" element={<ListToDo />} />
                <Route path="/todo/:id" element={<ToDoEntry />} />
                <Route path="/create" element={<ToDoForm />} />
                <Route path="/edit/:id" element={<ToDoForm />} />
              </Route>
            </Routes>
          </Router>
        </ButtonClickedProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
