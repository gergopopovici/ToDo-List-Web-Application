import React, { useState } from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useButtonClickedContext } from '../../Contexts/ButtonClickedProvider';
import { destroyToDo } from '../../services/ToDoService';

interface DeleteToDoProps {
  id: number;
}

export function DeleteToDoIcon({ id }: DeleteToDoProps) {
  const { setDeleteTodoButtonClicked } = useButtonClickedContext();
  const [binIconClicked, setBinIconClicked] = useState<boolean>(false);

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
        await destroyToDo(id);
        setBinIconClicked(false);
        setDeleteTodoButtonClicked(true);
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
