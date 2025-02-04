import { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Box, Typography, IconButton, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getToDosByUser } from '../services/ToDoService';
import { ResponseToDoDTO } from '../models/ToDo';
import ToDoCard from '../components/cards/ToDoCard';
import { useUser } from '../components/UserProvider';

function ListToDo() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    priority: '',
    dueDateFrom: '',
    dueDateTo: '',
  });

  const [pendingFilters, setPendingFilters] = useState(filters);
  const [filteredTodos, setFilteredTodos] = useState<ResponseToDoDTO[]>([]);

  const userId = user?.id;

  const {
    data: todos = [],
    error,
    isLoading,
  } = useQuery<ResponseToDoDTO[]>(['todos', userId], () => getToDosByUser(userId!), {
    enabled: !!userId,
    onSuccess: (data) => setFilteredTodos(data),
  });

  const handleAddClick = () => {
    navigate('/create');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const applyFilters = (filters2: typeof pendingFilters) => {
    let filtered = todos;

    if (filters2.priority) {
      filtered = filtered.filter((todo) => String(todo.priority) === filters2.priority);
    }
    if (filters2.dueDateFrom) {
      filtered = filtered.filter((todo) => new Date(todo.date) >= new Date(filters2.dueDateFrom));
    }
    if (filters2.dueDateTo) {
      filtered = filtered.filter((todo) => new Date(todo.date) <= new Date(filters2.dueDateTo));
    }
    setFilteredTodos(filtered);
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    applyFilters(pendingFilters);
  };

  const handleResetFilters = () => {
    setPendingFilters({ priority: '', dueDateFrom: '', dueDateTo: '' });
    setFilters({ priority: '', dueDateFrom: '', dueDateTo: '' });
    setFilteredTodos(todos);
  };

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('errorloadingtodo')}</div>;
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">{t('title')}</Typography>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap" marginBottom={3} marginTop={3}>
        <TextField
          select
          label={t('todopriority')}
          name="priority"
          value={pendingFilters.priority}
          onChange={handleFilterChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">{t('all')}</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </TextField>

        <TextField
          type="date"
          label={t('duedatefrom')}
          name="dueDateFrom"
          value={pendingFilters.dueDateFrom}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          label={t('duedateto')}
          name="dueDateTo"
          value={pendingFilters.dueDateTo}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" onClick={handleApplyFilters} sx={{ height: 40 }}>
          {t('applyfilters')}
        </Button>
        <Button variant="outlined" onClick={handleResetFilters} sx={{ height: 40 }}>
          {t('resetfilters')}
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <ToDoCard key={todo.id} todo={todo} />)
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="50vh">
            <Typography variant="h6" align="center">
              {t('notodosfound')}
            </Typography>
          </Box>
        )}
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
