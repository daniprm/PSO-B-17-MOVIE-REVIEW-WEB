'use client';
// import AppPagination from '../../Utilities/Pagination/Pagination';
import { MovieType } from '@/types/Movie/MovieType';
import { useEffect, useState } from 'react';
import MovieList from './MovieList';
import MovieSkeleton from '../Skeleton/MovieSkeleton';
import { supabase } from '@/db/supabaseClient';

const MovieListView = () => {
  // const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('movies').select();
        if (error) {
          throw error;
        }
        setMovies(data as MovieType[]);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <MovieSkeleton />
      ) : (
        <>
          <MovieList movies={movies!} />

          {/* <AppPagination page={page} setPage={setPage} totalPages={24} /> */}
        </>
      )}
    </>
  );
};

export default MovieListView;
