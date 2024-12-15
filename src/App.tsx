import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListToDo from './pages/ListToDo';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/toDos" />} />
          <Route path="/toDos" element={<ListToDo />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
