import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Typography, IconButton, Paper, Modal } from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getToDo } from '../services/ToDoService';
import { getTaskByToDoId } from '../services/TaskService';
import { ResponseToDoDTO } from '../models/ToDo';
import { ResponseTaskDTO } from '../models/Task';
import { DeleteToDoIcon } from '../components/buttons/DeleteToDoIcon';
import TaskForm from './TaskForm';

function ToDoEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  if (!id) {
    throw new Error(t('noidprovided'));
  }

  const {
    data: todo,
    error: todoError,
    isLoading: isTodoLoading,
  } = useQuery<ResponseToDoDTO>(['todo', id], () => getToDo(id));
  const {
    data: tasks,
    error: tasksError,
    isLoading: isTasksLoading,
    refetch,
  } = useQuery<ResponseTaskDTO[]>(['tasks', id], () => getTaskByToDoId(Number(id)));

  if (isTodoLoading || isTasksLoading) {
    return <div>{t('loading')}</div>;
  }
  if (todoError || tasksError) {
    return <div>{t('errorloadingtodo')}</div>;
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ marginTop: 50, padding: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {todo?.title}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton aria-label="edit" onClick={handleEditClick} sx={{ '&:hover': { color: 'blue' } }}>
            <EditIcon />
          </IconButton>
          {todo?.id !== undefined && <DeleteToDoIcon id={todo.id} onDelete={handleDelete} />}
        </Box>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 2, textAlign: 'justify', hyphens: 'auto' }}>
          <strong>{t('tododescription')}:</strong> {todo?.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>{t('tododuedate')}:</strong> {todoDate}
        </Typography>
        <Typography variant="body1" sx={{ color: getPriorityColor(todo?.priority) }}>
          <strong>{t('todopriority')}:</strong> {todo?.priority}
        </Typography>
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('tasks')}
          </Typography>
          {tasks?.map((task) => (
            <Paper key={task.id} elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="body2">{task.description}</Typography>
            </Paper>
          ))}
          <IconButton
            onClick={handleOpen}
            title={t('addtask')}
            sx={{
              marginLeft: 'auto',
              backgroundColor: 'green',
              color: 'white',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TaskForm todoId={Number(id)} onClose={handleClose} refetchTasks={refetch} />
        </Box>
      </Modal>
    </Box>
  );
}

export default ToDoEntry;
