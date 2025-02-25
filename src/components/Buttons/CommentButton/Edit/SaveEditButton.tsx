import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

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
    await fetch(`http://localhost:5000/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Updated:", data))
      .catch((err) => console.error("Error:", err));

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
