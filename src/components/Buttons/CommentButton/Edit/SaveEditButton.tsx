import { supabase } from '@/db/supabaseClient';
import { Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface PropsType {
  commentId: number;
  comment: string;
  onEditComment: () => void;
  setIdComment: Dispatch<SetStateAction<number | null>>;
}

const SaveEditButton = ({
  commentId,
  comment,
  onEditComment,
  setIdComment,
}: PropsType) => {
  const handleEditComment = async () => {
    const { error } = await supabase
      .from('comments')
      .update({ comment: comment })
      .eq('id', commentId);
    if (error) throw error;

    onEditComment();
    setIdComment(null);
  };
  return (
    <Button
      title="Save Edit"
      onClick={handleEditComment}
      size="small"
      variant="contained"
    >
      Save
    </Button>
  );
};

export default SaveEditButton;
