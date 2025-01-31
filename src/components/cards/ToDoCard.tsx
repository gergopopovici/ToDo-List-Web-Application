import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteToDoIcon } from '../buttons/DeleteToDoIcon';

interface ToDoCardProps {
  id: number;
  title: string;
  date: Date;
  priority: number;
}

function ToDoCard({ id, title, date, priority }: ToDoCardProps) {
  const navigate = useNavigate();

  const { t } = useTranslation();
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

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/edit/${id}`);
  };

  const todoDate = format(new Date(date), 'dd-MM-yyyy');

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
          <strong>{t('tododuedate')}:</strong> {todoDate}
        </Typography>
        <Typography variant="body2" color={getPriorityColor(priority)}>
          <strong>{t('todopriority')}:</strong> {priority}
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
        <IconButton
          aria-label="edit"
          onClick={handleEditClick}
          sx={{ '&:hover': { color: 'blue' } }}
          title={t('todoeditpage')}
        >
          <EditIcon />
        </IconButton>
        <DeleteToDoIcon id={id} onDelete={() => {}} />
      </Box>
    </Card>
  );
}

export default ToDoCard;
