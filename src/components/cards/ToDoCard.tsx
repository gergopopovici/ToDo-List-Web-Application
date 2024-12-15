import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DeleteToDoIcon } from '../buttons/DeleteToDoIcon';

interface ToDoCardProps {
  id: number;
  title: string;
  date: Date;
  priority: number;
}

function ToDoCard({ id, title, date, priority }: ToDoCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/todo/${id}`);
  };

  const getPriorityColor = (priorityLevel: number) => {
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

  const formattedDate = date instanceof Date ? date.toDateString() : 'Invalid Date';

  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        margin: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Due:</strong> {formattedDate}
        </Typography>
        <Typography variant="body2" color={getPriorityColor(priority)}>
          <strong>Priority:</strong> {priority}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 1,
          gap: '10px',
        }}
      >
        <DeleteToDoIcon id={id} />
      </Box>
    </Card>
  );
}

export default ToDoCard;
