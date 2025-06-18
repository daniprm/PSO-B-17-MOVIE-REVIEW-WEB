import AppShell from '@/components/layouts/AppShell/AppShell';
import { Suspense } from 'react';
import MovieDetailPage from '@/components/Movies/Detail/MovieDetailPage';
import Loading from '@/components/Loading/Loading';
import CommentBox from '@/components/Comment/CommentBox';
import { supabase } from '@/db/supabaseClient';
const CommentsContent = async ({ movieId }: { movieId: string }) => {
  const { data: commentsData } = await supabase
    .from('comments')
    .select()
    .eq('movie_id', movieId);
  return <CommentBox movieId={movieId} commentsData={commentsData!} />;
};

const MovieDetail = async ({ params }: { params: { movieId: string } }) => {
  const { movieId } = await params;
  const { data: movie, error } = await supabase
    .from('movies')
    .select()
    .eq('id', movieId);
  if (error) {
    throw error;
  }

  return (
    <AppShell>
      <MovieDetailPage movie={movie[0]} />
      <Suspense fallback={Loading()}>
        <CommentsContent movieId={movieId} />
      </Suspense>
    </AppShell>
  );
};

export default MovieDetail;
