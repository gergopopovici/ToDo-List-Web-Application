import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { format } from 'date-fns';
import { getToDo, createToDo, updateToDo } from '../services/ToDoService';
import { ToDo } from '../models/ToDo';

function ToDoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);

  const { isLoading } = useQuery<ToDo>(['todo', id], () => getToDo(id!), {
    enabled: !!id,
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
      setDueDate(format(new Date(data.date), 'yyyy-MM-dd'));
      setPriority(data.priority);
    },
  });

  const createMutation = useMutation(createToDo, {
    onSuccess: (newToDo) => {
      console.log(newToDo);
      navigate(`/todo/${newToDo.id}`);
    },
  });

  const updateMutation = useMutation(
    ({ id: toDoId, newToDo }: { id: number; newToDo: Omit<ToDo, 'id'> }) => updateToDo(toDoId, newToDo),
    {
      onSuccess: () => {
        navigate(`/todo/${id}`);
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newToDo: Omit<ToDo, 'id'> = {
      title,
      description,
      date: new Date(dueDate),
      priority,
    };

    if (id) {
      updateMutation.mutate({ id: parseInt(id, 10), newToDo });
    } else {
      createMutation.mutate(newToDo);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 5 }}
    >
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
      />
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
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value as number)} label="Priority">
          <MenuItem value={1}>High</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Low</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" disabled={createMutation.isLoading || updateMutation.isLoading}>
        {id ? 'Update ToDo' : 'Create ToDo'}
      </Button>
    </Box>
  );
}

export default ToDoForm;
