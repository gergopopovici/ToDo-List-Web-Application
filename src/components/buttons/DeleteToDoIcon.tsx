import React, { useState } from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useButtonClickedContext } from '../../Contexts/ButtonClickedProvider';
import { destroyToDo } from '../../services/ToDoService';
import { useUser } from '../UserProvider';

interface DeleteToDoProps {
  id: number;
  onDelete: () => void;
}

export function DeleteToDoIcon({ id, onDelete }: DeleteToDoProps) {
  const { setDeleteTodoButtonClicked } = useButtonClickedContext();
  const [binIconClicked, setBinIconClicked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { t } = useTranslation();

  const handleBinClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(true);
  };

  const handleBinCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(false);
  };

  const handleDeleteToDo = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (id) {
        if (user?.id !== undefined) {
          await destroyToDo(id, user.id);
        } else {
          throw new Error(t('useridunidentified'));
        }
        setBinIconClicked(false);
        setDeleteTodoButtonClicked(true);
        queryClient.invalidateQueries('todos');
        onDelete();
      }
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data: string } }).response?.data || 'Unknown error occurred';
      console.error(errorMessage);
    }
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleBinClick} sx={{ '&:hover': { color: 'red' } }}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={binIconClicked} onClose={handleBinCancel}>
        <DialogTitle>{t('deletetodotitle')}</DialogTitle>
        <DialogContent>{t('deletetododialogcontent')}</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteToDo}>{t('dialogyes')}</Button>
          <Button onClick={handleBinCancel}>{t('dialogno')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
