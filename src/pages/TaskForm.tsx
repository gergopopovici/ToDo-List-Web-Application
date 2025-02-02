import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { addTaskToToDo } from '../services/TaskService';
import { RequestTaskDTO } from '../models/Task';

interface TaskFormProps {
  todoId: number;
  onClose: () => void;
  refetchTasks: () => void;
}

function TaskForm({ todoId, onClose, refetchTasks }: TaskFormProps) {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createMutation = useMutation((newTask: RequestTaskDTO) => addTaskToToDo(todoId, newTask), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', todoId]);
      refetchTasks();
      onClose();
      navigate(`/todo/${todoId}`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask: RequestTaskDTO = {
      description,
    };
    createMutation.mutate(newTask);
  };

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
      }}
    >
      <Typography variant="h4" gutterBottom>
        {t('taskcreatepage')}
      </Typography>
      <TextField
        label={t('taskdescription')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={createMutation.isLoading}>
        {t('taskcreatepage')}
      </Button>
    </Box>
  );
}

export default TaskForm;
