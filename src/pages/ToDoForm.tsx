import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Box, TextField, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { getToDo, createToDo, updateToDo } from '../services/ToDoService';
import { RequestToDoDTO, ResponseToDoDTO } from '../models/ToDo';
import { useUser } from '../components/UserProvider';

function ToDoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);
  const { user } = useUser();

  const { isLoading } = useQuery<ResponseToDoDTO>(['todo', id], () => getToDo(id!), {
    enabled: !!id,
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
      setDueDate(format(new Date(data.date), 'yyyy-MM-dd'));
      setPriority(data.priority);
    },
  });

  const createMutation = useMutation(createToDo, {
    onSuccess: () => {
      navigate('/toDos');
    },
  });

  const updateMutation = useMutation((updatedToDo: RequestToDoDTO) => updateToDo(Number(id), updatedToDo), {
    onSuccess: () => {
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
    };

    if (id) {
      updateMutation.mutate(newToDo);
    } else {
      createMutation.mutate(newToDo);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit ToDo' : 'Create ToDo'}
      </Typography>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <TextField
        label="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Priority"
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={createMutation.isLoading || updateMutation.isLoading}
      >
        {id ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
}

export default ToDoForm;
