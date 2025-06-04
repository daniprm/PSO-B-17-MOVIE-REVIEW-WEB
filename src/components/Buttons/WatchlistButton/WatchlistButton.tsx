'use client';

import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createClient } from '@/Utilities/supabase/client';

const WatchlistButton = ({ movieId }: { movieId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const supabase = createClient();
  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await supabase.auth.getUser();

      setUserId(user.user?.id);
      if (userId) {
        const { data: watchlistId } = await supabase
          .from('watchlist')
          .select('movie_id')
          .eq('user_id', userId);
        const watchlistIdFound = watchlistId?.find(
          (item) => item.movie_id === movieId
        );
        if (watchlistIdFound) setIsInWatchlist(true);
      }
    };
    fetchData();
  }, [supabase, userId, movieId]);

  const handleAddWatchlist = async () => {
    if (isInWatchlist) {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('movie_id', movieId)
        .eq('user_id', userId);
      if (error) throw error;

      setIsInWatchlist(false);
    } else {
      const { error } = await supabase
        .from('watchlist')
        .insert({ movie_id: movieId, user_id: userId });
      if (error) throw error;
      setIsInWatchlist(true);
    }
  };

  return (
    <IconButton
      sx={
        isInWatchlist
          ? {
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#CA3E47',
              '&:hover': {
                backgroundColor: '#CA3E47',
              },
            }
          : {
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
              },
            }
      }
      onClick={() => handleAddWatchlist()}
      disabled={!userId}
    >
      {isInWatchlist ? (
        <FavoriteIcon className="text-white" />
      ) : (
        <FavoriteBorderIcon className="text-white" />
      )}
    </IconButton>
  );
};

export default WatchlistButton;
