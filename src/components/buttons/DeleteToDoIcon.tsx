import React, { useState } from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { destroyToDo } from '../../services/ToDoService';
import { useUser } from '../UserProvider';

interface DeleteToDoProps {
  id: number;
  onDelete: () => void;
}

export function DeleteToDoIcon({ id, onDelete }: DeleteToDoProps) {
  const [binIconClicked, setBinIconClicked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { t } = useTranslation();

  const mutation = useMutation(
    () => {
      if (user?.id !== undefined) {
        return destroyToDo(id, user.id);
      }
      throw new Error(t('useridunidentified'));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        setBinIconClicked(false);
        onDelete();
      },
    },
  );

  const handleBinClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(true);
  };

  const handleBinCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBinIconClicked(false);
  };

  const handleDeleteToDo = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (id && user?.id !== undefined) {
      mutation.mutate();
    }
  };

  return (
    <Box>
      <IconButton
        aria-label="delete"
        onClick={handleBinClick}
        sx={{ '&:hover': { color: 'red' } }}
        title={t('deletetodotitle')}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={binIconClicked} onClose={handleBinCancel}>
        <DialogTitle>{t('deletetodotitle')}</DialogTitle>
        <DialogContent>{t('deletetododialogcontent')}</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteToDo} disabled={mutation.isLoading}>
            {mutation.isLoading ? t('deleting') : t('dialogyes')}
          </Button>
          <Button onClick={handleBinCancel}>{t('dialogno')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
