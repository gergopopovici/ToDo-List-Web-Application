import React, { useState } from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from 'react-query';
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
          throw new Error('User ID is undefined');
        }
        setBinIconClicked(false);
        setDeleteTodoButtonClicked(true);
        queryClient.invalidateQueries('todos');
        onDelete();
      }
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data: string } }).response?.data || 'Unknown error occurred';
      console.log(`An error occurred while deleting the ToDo with ID ${id}: ${errorMessage}`);
    }
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleBinClick} sx={{ '&:hover': { color: 'red' } }}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={binIconClicked} onClose={handleBinCancel}>
        <DialogTitle>Delete ToDo</DialogTitle>
        <DialogContent>Are you sure you want to delete this ToDo entry?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteToDo}>Yes</Button>
          <Button onClick={handleBinCancel}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
