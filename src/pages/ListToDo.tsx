import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getToDosByUser } from '../services/ToDoService';
import { ResponseToDoDTO } from '../models/ToDo';
import ToDoCard from '../components/cards/ToDoCard';
import { useButtonClickedContext } from '../Contexts/ButtonClickedProvider';
import { useUser } from '../components/UserProvider';

function ListToDo() {
  const queryClient = useQueryClient();
  const { deleteTodoButtonClicked, setDeleteTodoButtonClicked } = useButtonClickedContext();
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation();
  const userId = user?.id;
  const {
    data: todos = [],
    error,
    isLoading,
  } = useQuery<ResponseToDoDTO[]>(['todos', userId], () => getToDosByUser(userId!), {
    enabled: !!userId,
  });

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
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('errorloadingtodo')}</div>;
  }

  const handleAddClick = () => {
    navigate('/create');
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">{t('title')}</Typography>
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
        title={t('todocreatepage')}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default ListToDo;
