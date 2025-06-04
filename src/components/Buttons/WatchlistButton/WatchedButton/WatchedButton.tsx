'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { createClient } from '@/Utilities/supabase/client';

const WatchedButton = ({ movieId }: { movieId: string }) => {
  const [isInWatched, setIsInWatched] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setUserId((await supabase.auth.getUser()).data.user?.id);
      const { data: watchedId } = await supabase
        .from('watchlist')
        .select('movie_id')
        .eq('isWatched', true)
        .eq('user_id', userId);

      const WatchedIdFound = watchedId?.find(
        (item) => item.movie_id === movieId
      );

      if (WatchedIdFound) setIsInWatched(true);
    };
    fetchData();
  }, [supabase, userId, movieId]);

  const handleAddWatched = async () => {
    if (isInWatched) {
      await supabase
        .from('watchlist')
        .update({ isWatched: false })
        .eq('movie_id', movieId)
        .eq('user_id', userId);
      setIsInWatched(false);
    } else {
      await supabase
        .from('watchlist')
        .update({ isWatched: true })
        .eq('movie_id', movieId)
        .eq('user_id', userId);
      setIsInWatched(true);
    }
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
