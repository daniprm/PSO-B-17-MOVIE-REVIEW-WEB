'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const GenreButton = ({ genre }: { genre: string }) => {
  const router = useRouter();
  const handleGenreClick = () => {
    router.push(`/filter/${genre}`);
  };
  return (
    <Button
      key={genre}
      variant="outlined"
      sx={{ border: 1, borderRadius: 100, textTransform: 'none' }}
      onClick={handleGenreClick}
    >
      {genre}
    </Button>
  );
};

export default GenreButton;
