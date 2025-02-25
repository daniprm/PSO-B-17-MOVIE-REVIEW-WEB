import { Button } from "@mui/material";

interface PropsType {
  movieId: string;
  comment?: string;
  onCommentAdded: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const CommentButton = ({
  movieId,
  comment,
  onCommentAdded,
  setComment,
}: PropsType) => {
  const handleComment = async () => {
    if (comment) {
      await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movieId, comment: comment }),
      });

      onCommentAdded();
      setComment("");
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
