import React from 'react';
import { fetchRandomAdvice } from '../Api/api';
import { Button, Typography, Switch, Stack } from '@mui/material';
import AdviceCard from './adviceCard';
import { Advice } from '../interfaces/advice';

const SwiftAdvice: React.FC = () => {
  console.log('Szar');
  const [advice, setAdvice] = React.useState<Advice[]>([]);
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleGetRandomAdvice = async () => {
    const result = await fetchRandomAdvice();
    if (result) {
      setAdvice((prev) => prev.concat(result));
    }
  };
  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  return (
    <div className="container">
      <h1>Advices</h1>
      <div className="controls">
        <Switch checked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)} color="primary" />
        <Button onClick={handleGetRandomAdvice}>Get Random Advice</Button>
      </div>
      {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
      <Stack spacing={3}>
        {advice
          .filter((a) => !showFavorites || favorites.has(a.id))
          .map((a) => (
            <AdviceCard advice={a} isFavorite={favorites.has(a.id)} onToggleFavorite={handleToggleFavorite} />
          ))}
      </Stack>
    </div>
  );
};
export default SwiftAdvice;
