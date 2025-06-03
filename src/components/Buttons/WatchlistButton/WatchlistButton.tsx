'use client';

import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { supabase } from '@/db/supabaseClient';

const WatchlistButton = ({ movieId }: { movieId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data: watchlistId } = await supabase
        .from('watchlist')
        .select('movie_id');

      const watchlistIdFound = watchlistId?.find(
        (item) => item.movie_id === movieId
      );

      if (watchlistIdFound) setIsInWatchlist(true);
    };
    fetchData();
  }, [movieId]);

  const handleAddWatchlist = async () => {
    // if (isInWatchlist) {
    //   await supabase.from('watchlist').delete().eq('movie_id', movieId); // perlu userId
    //   setIsInWatchlist(false);
    // } else {
    //   await supabase.from('watchlist').insert({ movie_id: movieId }); // perlu userId
    //   setIsInWatchlist(true);
    // }
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
