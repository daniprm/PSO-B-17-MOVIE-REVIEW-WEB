import { Box } from '@mui/material';
import CommentsWrapper from './CommentsWrapper';
import { CommentType } from '@/types/Comment/CommentType';

const CommentBox = ({
  movieId,
  commentsData,
}: {
  movieId: string;
  commentsData: CommentType[];
}) => {
  return (
    <>
      <Box
        component="form"
        className="mx-3 my-8 border-solid border-2 rounded-lg p-5"
        sx={{
          borderColor: 'text.primary',
        }}
        autoComplete="off"
      >
        <CommentsWrapper movieId={movieId} commentsData={commentsData} />
      </Box>
    </>
  );
};

export default CommentBox;
