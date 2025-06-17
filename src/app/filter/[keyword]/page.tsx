import AppShell from '@/components/layouts/AppShell/AppShell';
import { Suspense } from 'react';
import Header from '@/components/layouts/Header/Header';
import Loading from '@/components/Loading/Loading';
import MovieList from '@/components/Movies/MovieList';
import { supabase } from '@/db/supabaseClient';

const MovieContent = async ({ keyword }: { keyword: string }) => {
  const { data, error } = await supabase
    .from('genre')
    .select(`name, mov_genres(movies(*))`)
    .ilike('name', `%${keyword}%`);
  if (error) {
    return <MovieList movies={[]} />;
  }

  const movies = data
    ?.map((item) => item.mov_genres)
    .flat()
    .map((item) => item.movies)
    .flat();
  return <MovieList movies={movies} />;
};

const Filter = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);

  return (
    <AppShell>
      <Header>Hasil Filter</Header>
      <Suspense fallback={<Loading />}>
        <MovieContent keyword={decodedKeyword} />
      </Suspense>
    </AppShell>
  );
};

export default Filter;
