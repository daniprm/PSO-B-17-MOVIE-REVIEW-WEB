'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { supabase } from '@/db/supabaseClient';

const WatchedButton = ({ movieId }: { movieId: string }) => {
  const [isInWatched, setIsInWatched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data: watchedId } = await supabase
        .from('watchlist')
        .select('movie_id')
        .eq('isWatched', true);

      const WatchedIdFound = watchedId?.find(
        (item) => item.movie_id === movieId
      );

      if (WatchedIdFound) setIsInWatched(true);
    };
    fetchData();
  }, [movieId]);

  const handleAddWatched = async () => {
    // if (isInWatched) {
    //   await supabase
    //     .from('watchlist')
    //     .update({ isWatched: false })
    //     .eq('movie_id', movieId); // perlu userId
    //   setIsInWatched(false);
    // } else {
    //   await supabase
    //     .from('watchlist')
    //     .update({ isWatched: true })
    //     .eq('movie_id', movieId); // perlu userId
    //   setIsInWatched(true);
    // }
  };

  return isInWatched ? (
    <Button
      variant="contained"
      sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }}
      onClick={() => handleAddWatched()}
    >
      Watched
    </Button>
  ) : (
    <Button
      variant="contained"
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        fontWeight: 'bold',
        color: '#0079FF',
        backgroundColor: 'white',
        '&:hover': { backgroundColor: 'white/85' },
      }}
      onClick={() => handleAddWatched()}
    >
      Watch
    </Button>
  );
};

export default WatchedButton;
