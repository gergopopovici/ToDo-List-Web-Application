import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Typography, IconButton } from '@mui/material';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import { getToDo } from '../services/ToDoService';
import { ResponseToDoDTO } from '../models/ToDo';
import { DeleteToDoIcon } from '../components/buttons/DeleteToDoIcon';

function ToDoEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) {
    throw new Error('No id provided');
  }
  const { data: todo, error, isLoading } = useQuery<ResponseToDoDTO>(['todo', id], () => getToDo(id));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading todo</div>;
  }
  const todoDate = todo?.date ? format(new Date(todo.date), 'dd-MM-yyyy') : 'Invalid date';

  const handleDelete = () => {
    navigate('/');
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/edit/${id}`);
  };

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
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton aria-label="edit" onClick={handleEditClick} sx={{ '&:hover': { color: 'blue' } }}>
          <EditIcon />
        </IconButton>
        {todo?.id !== undefined && <DeleteToDoIcon id={todo.id} onDelete={handleDelete} />}
      </Box>
      <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
        <strong>Description:</strong> {todo?.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Due Date:</strong> {todoDate}
      </Typography>
      <Typography variant="body1" sx={{ color: getPriorityColor(todo?.priority) }}>
        <strong>Priority:</strong> {todo?.priority}
      </Typography>
    </Box>
  );
}

export default ToDoEntry;
