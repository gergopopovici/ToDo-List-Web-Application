import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Advice } from '../interfaces/advice';

const AdviceCard: React.FC<{ advice: Advice; isFavorite: boolean; onToggleFavorite: (id: number) => void }> = ({
  advice,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{advice.advice}</Typography>
        <IconButton onClick={() => onToggleFavorite(advice.id)} color={isFavorite ? 'secondary' : 'default'}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AdviceCard;
