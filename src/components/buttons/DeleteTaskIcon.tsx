import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { RequestToDoDTO } from '../../models/ToDo';
import { getToDo } from '../../services/ToDoService';
import { deleteTaskFromToDo } from '../../services/TaskService';
import { useUser } from '../UserProvider';

interface DeleteTaskProps {
  toDoId: number;
  id: number;
}

export function DeleteTaskIcon({ toDoId, id }: DeleteTaskProps) {
  const [binIconClicked, setBinIconClicked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { t } = useTranslation();

  const mutation = useMutation(() => deleteTaskFromToDo(toDoId, id), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('todos');
      setBinIconClicked(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleBinClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(true);
  };

  const handleBinCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(false);
  };

  const handleDeleteTask = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (binIconClicked && user?.id !== undefined) {
        const request: RequestToDoDTO = await getToDo(toDoId.toString());
        if (request?.userId === user.id) {
          mutation.mutate();
        }
      }
    } catch (error: unknown) {
      console.error((error as { response?: { data: string } }).response?.data);
    }
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleBinClick} sx={{ '&:hover': { color: 'red' } }}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={binIconClicked} onClose={handleBinCancel}>
        <DialogTitle>{t('dialogdeletetasktitle')}</DialogTitle>
        <DialogContent>{t('dialogdeletetaskcontent')}</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTask} disabled={mutation.isLoading}>
            {mutation.isLoading ? t('deleting') : t('dialogyes')}
          </Button>
          <Button onClick={handleBinCancel}>{t('dialogno')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
