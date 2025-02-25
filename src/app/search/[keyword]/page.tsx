import AppShell from '@/components/layouts/AppShell/AppShell';
import { Suspense } from 'react';
import MovieList from '@/components/Movies/MovieList';
import Header from '@/components/layouts/Header/Header';
import Loading from '@/components/Loading/Loading';
import { supabase } from '@/db/supabaseClient';

const MoviesWithStreaming = async ({ keyword }: { keyword: string }) => {
  // const movies = await fetchMoviesWithDelay(keyword);

  const { data: moviesData, error } = await supabase
    .from('movies')
    .select()
    .ilike('title', `%${keyword}%`);
  if (error) throw error;

  return <MovieList movies={await Promise.all(moviesData)} />;
};

const Search = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = await params;
  const decodedKeyword = decodeURI(keyword);

  return (
    <AppShell>
      <Header>Hasil Pencarian Untuk {decodedKeyword}</Header>
      <Suspense fallback={<Loading />}>
        <MoviesWithStreaming keyword={decodedKeyword} />
      </Suspense>
    </AppShell>
  );
};

export default Search;
