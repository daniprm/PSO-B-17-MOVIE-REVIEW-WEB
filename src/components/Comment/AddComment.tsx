import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, TextField } from '@mui/material';
import CommentButton from '../Buttons/CommentButton/CommentButton';

interface PropsType {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  movieId: string;
  fetchComments: () => void;
  userId: string;
}

const AddComment = ({
  comment,
  setComment,
  movieId,
  fetchComments,
  userId,
}: PropsType) => {
  return (
    <>
      <Box className="flex flex-row gap-2 pb-4 items-center pr-6">
        <AccountCircleIcon
          sx={{ color: 'text.primary' }}
          className="text-5xl"
        />
        <TextField
          label="Add a Comment"
          variant="standard"
          slotProps={{ inputLabel: { style: { color: 'gray' } } }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          fullWidth
        />
      </Box>
      <CommentButton
        movieId={movieId}
        comment={comment}
        onCommentAdded={fetchComments}
        setComment={setComment}
        userId={userId}
      />
    </>
  );
};

export default AddComment;
