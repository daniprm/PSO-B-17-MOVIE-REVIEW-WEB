import { Button } from '@mui/material';
import { supabase } from '@/db/supabaseClient';

interface PropsType {
  movieId: string;
  comment?: string;
  onCommentAdded: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}

const CommentButton = ({
  movieId,
  comment,
  onCommentAdded,
  setComment,
  userId,
}: PropsType) => {
  const handleComment = async () => {
    if (comment) {
      const { error } = await supabase
        .from('comments')
        .insert({ movie_id: movieId, user_id: userId, comment: comment });
      if (error) throw error;

      onCommentAdded();
      setComment('');
    }
  };

  return (
    <Button
      variant="contained"
      className="ml-[57px]"
      size="small"
      onClick={handleComment}
    >
      Comment
    </Button>
  );
};

export default CommentButton;
