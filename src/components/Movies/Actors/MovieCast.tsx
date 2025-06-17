import { supabase } from '@/db/supabaseClient';
import { Typography } from '@mui/material';

const MovieCast = async ({ castId }: { castId: number[] }) => {
  // const res = await fetch(`http://localhost:5000/actors`);
  // const actors = await res.json();
  // const actorsFiltered = actors.filter((actor: ActorType) =>
  //   castId.includes(actor.id)
  // );
  // const cast = actorsFiltered.map((actor: ActorType) => actor.name);

  const { data, error } = await supabase
    .from('actors')
    .select('name')
    .in('id', castId);
  if (error) throw error;
  const cast = data.map((actor) => actor.name);

  return (
    <Typography variant="h6" className="pt-2" sx={{ color: 'text.primary' }}>
      <span className="font-bold">Cast:</span> {cast.join(', ')}
    </Typography>
  );
};

export default MovieCast;
