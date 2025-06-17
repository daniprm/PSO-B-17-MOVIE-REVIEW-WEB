import AppShell from '@/components/layouts/AppShell/AppShell';
import MovieList from '@/components/Movies/MovieList';
import Header from '@/components/layouts/Header/Header';
import { createClient } from '@/Utilities/supabase/server';
import { supabase } from '@/db/supabaseClient';

const Watchlist = async () => {
  const supabaseServer = createClient();
  const user = (await supabaseServer).auth.getUser();
  const userId = (await user).data.user?.id;

  const { data: watchlistData } = await supabase
    .from('watchlist')
    .select('movies(*), isWatched')
    .eq('user_id', userId);

  const watchlistMovies =
    watchlistData
      ?.filter((movie) => movie.isWatched == false)
      .map((item) => item.movies)
      .flat() ?? [];

  const watchedMovies =
    watchlistData
      ?.filter((movie) => movie.isWatched == true)
      .map((item) => item.movies)
      .flat() ?? [];

  return (
    <>
      <AppShell>
        <Header>Watchlist</Header>
        <MovieList movies={watchlistMovies} />
        <Header>Watched</Header>
        <MovieList movies={watchedMovies} />
      </AppShell>
    </>
  );
};

export default Watchlist;
