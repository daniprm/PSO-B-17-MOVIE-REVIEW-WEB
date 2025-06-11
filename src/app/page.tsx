import AppShell from "@/components/layouts/AppShell/AppShell";
import MovieListView from "@/components/Movies/MovieListView";

export default async function Home() {
  return (
    <>
      <AppShell>
        <MovieListView data-cy="movie-list-container"/>
      </AppShell>
    </>
  );
}
