import React from 'react';
import { Button, Typography, Switch, Stack, TextField } from '@mui/material';
import { fetchRandomAdvice, fetchAdviceByKeyword } from '../Api/api';
import AdviceCard from './adviceCard';
import { Advice } from '../interfaces/advice';

const SwiftAdvice: React.FC = function SwiftAdvice() {
  const [advice, setAdvice] = React.useState<Advice[]>([]);
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [keyword, setSearchKeyword] = React.useState('');

  const handleGetRandomAdvice = async () => {
    const result = await fetchRandomAdvice();
    if (result) {
      setAdvice((prev) => {
        if (!prev.some((a) => a.id === result.id)) {
          return [...prev, result];
        }
        return prev;
      });
    }
  };
  const handleGetAdviceByKeyword = async (searchKeyWord: string) => {
    const result = await fetchAdviceByKeyword(searchKeyWord);
    if (result.slips) {
      setFavorites(new Set());
      setAdvice(result.slips);
      setErrorMessage('');
    } else {
      setAdvice([]);
      setErrorMessage(`No advice found for keyword "${searchKeyWord}"`);
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
        <TextField label="Search Advice" value={keyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        <Button onClick={() => handleGetAdviceByKeyword(keyword)}>Search</Button>
        <Switch checked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)} color="primary" />
        <Button onClick={handleGetRandomAdvice}>Get Random Advice</Button>
      </div>
      {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
      <Stack spacing={3}>
        {advice
          .filter((a) => !showFavorites || favorites.has(a.id))
          .map((a) => (
            <AdviceCard
              key={a.id}
              advice={a}
              isFavorite={favorites.has(a.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
      </Stack>
    </div>
  );
};
export default SwiftAdvice;
