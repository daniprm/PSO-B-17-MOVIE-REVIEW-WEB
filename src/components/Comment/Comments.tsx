import { Box, IconButton, TextField, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveEditButton from '../Buttons/CommentButton/Edit/SaveEditButton';
import DeleteButton from '../Buttons/CommentButton/Delete/DeleteButton';

interface PropsType {
  comments: {
    id: number;
    comment: string;
    email: string;
    created_at: string;
  }[];
  idComment: number | null;
  setIdComment: React.Dispatch<React.SetStateAction<number | null>>;
  editedComment: string;
  setEditedComment: React.Dispatch<React.SetStateAction<string>>;
  handleEditComment: (idComment: number) => void;
  fetchComments: () => void;
  currentUserEmail: string;
}

const Comments = ({
  comments,
  idComment,
  setIdComment,
  editedComment,
  setEditedComment,
  handleEditComment,
  fetchComments,
  currentUserEmail,
}: PropsType) => {
  return (
    <Box className="pt-12 pl-[57px] pr-[25px]">
      {comments?.map((c) => (
        <Box key={c.id} className="relative ">
          <Box
            className="flex flex-row gap-2 mb-3 pb-4 border-b-[1px] "
            sx={{ borderColor: 'text.primary' }}
          >
            <AccountCircleIcon
              sx={{
                color: 'text.primary',
                mt: '16px',
              }}
            />
            <Box>
              <Box
                sx={{
                  color: 'text.primary',
                  pr: '36px',
                  pt: '12px',
                  display: 'flex',
                  gap: '4px',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    fontWeight: 'bold',
                  }}
                >
                  {c.email}
                </Typography>
                {'· ' + c.created_at.slice(0, 10)}
              </Box>
              {idComment === c.id ? (
                <TextField
                  sx={{
                    color: 'red',

                    pr: '36px',
                  }}
                  defaultValue={c.comment}
                  variant="standard"
                  multiline
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    pr: '36px',
                  }}
                >
                  {c.comment}
                </Typography>
              )}
            </Box>
          </Box>

          {idComment !== c.id && c.email === currentUserEmail && (
            <>
              <IconButton
                className="absolute top-[-4px] right-0"
                title="Edit"
                onClick={() => handleEditComment(c.id)}
              >
                <EditIcon className="text-sm" />
              </IconButton>
              <DeleteButton commentId={c.id} onDeleteComment={fetchComments} />
            </>
          )}

          {idComment === c.id && c.email === currentUserEmail && (
            <Box className="flex flex-row gap-3 justify-end">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIdComment(null)}
              >
                Cancel
              </Button>
              <SaveEditButton
                commentId={c.id}
                onEditComment={fetchComments}
                comment={editedComment}
                setIdComment={setIdComment}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Comments;
