'use client';

import React, { useEffect, useState } from 'react';
import MovieList from '@/components/Movies/MovieList';
import { supabase } from '@/db/supabaseClient';
import { MovieType } from '@/types/Movie/MovieType';

const MoviesWithStreaming = ({ keyword }: { keyword: string }) => {
  const [movies, setMovies] = useState([] as MovieType[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: movies, error } = await supabase.from('movies').select();
        if (error) throw error;

        setMovies(movies as MovieType[]);
      } catch (err) {
        console.error('Failed to fetch movies', err);
      }
    };
    fetchData();
  }, [keyword]);

  return <MovieList movies={movies} />;
};

export default MoviesWithStreaming;
