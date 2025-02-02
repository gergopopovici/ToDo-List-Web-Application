import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, TextField, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getToDo, createToDo, updateToDo } from '../services/ToDoService';
import { RequestToDoDTO, ResponseToDoDTO } from '../models/ToDo';
import { useUser } from '../components/UserProvider';
import { Task } from '../models/Task';

function ToDoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);
  const [priorityError, setPriorityError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useUser();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading } = useQuery<ResponseToDoDTO>(['todo', id], () => getToDo(id!), {
    enabled: !!id,
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
      setDueDate(format(new Date(data.date), 'yyyy-MM-dd'));
      setPriority(data.priority);
      setTasks([]);
    },
  });

  const createMutation = useMutation(createToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      navigate('/toDos');
    },
  });

  const updateMutation = useMutation((updatedToDo: RequestToDoDTO) => updateToDo(Number(id), updatedToDo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todo', id]);
      navigate('/toDos');
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newToDo: RequestToDoDTO = {
      title,
      description,
      date: new Date(dueDate),
      priority,
      userId: user!.id,
      tasks: tasks.map((task) => ({ ...task, id: task.id ?? 0 })),
    };

    if (id) {
      updateMutation.mutate(newToDo);
    } else {
      createMutation.mutate(newToDo);
    }
  };

  useEffect(() => {
    if (priority < 1 || priority > 3) {
      setPriorityError(t('priorityerror'));
    } else {
      setPriorityError('');
    }
  }, [priority]);

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {id ? t('todoeditpage') : t('todocreatepage')}
      </Typography>
      <TextField label={t('todotitle')} value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField
        label={t('tododescription')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TextField
        label={t('tododuedate')}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label={t('todopriority')}
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        error={!!priorityError}
        helperText={priorityError}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={createMutation.isLoading || updateMutation.isLoading}
      >
        {id ? t('todoedit') : t('todocreate')}
      </Button>
    </Box>
  );
}

export default ToDoForm;
