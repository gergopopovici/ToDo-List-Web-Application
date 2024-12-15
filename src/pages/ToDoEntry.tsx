import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';
import { getToDo } from '../services/ToDoService';
import { ToDo } from '../models/ToDo';

function ToDoEntry() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('No id provided');
  }
  const { data: todo, error, isLoading } = useQuery<ToDo>(['todo', id], () => getToDo(id));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading todo</div>;
  }
  const todoDate = todo?.date ? new Date(todo.date) : null;

  const getPriorityColor = (priorityLevel?: number) => {
    switch (priorityLevel) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {todo?.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {todo?.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Due Date:</strong> {todoDate?.toDateString()}
      </Typography>
      <Typography variant="body1" sx={{ color: getPriorityColor(todo?.priority) }}>
        <strong>Priority:</strong> {todo?.priority}
      </Typography>
    </Box>
  );
}
export default ToDoEntry;
