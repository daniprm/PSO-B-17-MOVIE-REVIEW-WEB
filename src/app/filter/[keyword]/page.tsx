import AppShell from '@/components/layouts/AppShell/AppShell';
import { Suspense } from 'react';
import Header from '@/components/layouts/Header/Header';
import Loading from '@/components/Loading/Loading';
import MovieList from '@/components/Movies/MovieList';
import { supabase } from '@/db/supabaseClient';

const MovieContent = async ({ keyword }: { keyword: string }) => {
  const { data: movies, error } = await supabase
    .from('movies')
    .select(`*, mov_genres(genre(name))`)
    .ilike('mov_genres.genre.name', `${keyword}`);
  if (error) {
    return <MovieList movies={[]} />;
  }
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
