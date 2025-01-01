import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getToDos } from '../services/ToDoService';
import { ToDo } from '../models/ToDo';
import ToDoCard from '../components/cards/ToDoCard';
import { useButtonClickedContext } from '../Contexts/ButtonClickedProvider';

function ListToDo() {
  const queryClient = useQueryClient();
  const { data: todos, error, isLoading } = useQuery<ToDo[]>('todos', getToDos);
  const { deleteTodoButtonClicked, setDeleteTodoButtonClicked } = useButtonClickedContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteTodoButtonClicked) {
      (async () => {
        try {
          console.log('Delete todo button clicked:', deleteTodoButtonClicked);
          await queryClient.invalidateQueries('todos');
          console.log('ToDos updated after delete');
          setDeleteTodoButtonClicked(false);
        } catch (errorResponse: unknown) {
          console.error('Error updating todos:', errorResponse);
        }
      })();
    }
  }, [deleteTodoButtonClicked, queryClient, setDeleteTodoButtonClicked]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading toDos</div>;
  }

  const handleAddClick = () => {
    navigate('/create');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">My ToDos</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {todos?.map((todo) => (
          <ToDoCard
            key={todo.id}
            id={todo.id ?? 0}
            title={todo.title}
            date={new Date(todo.date)}
            priority={todo.priority}
          />
        ))}
      </Box>
      <IconButton
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 56,
          height: 56,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            color: 'green',
          },
        }}
        onClick={handleAddClick}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default ListToDo;
