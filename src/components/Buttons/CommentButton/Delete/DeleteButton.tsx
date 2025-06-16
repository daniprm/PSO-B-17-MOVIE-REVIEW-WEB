import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { supabase } from '@/db/supabaseClient';

interface PropsType {
  commentId: number;
  onDeleteComment: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

function TransitionsModal({
  open,
  setOpen,
  handleDelete,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete Comment
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              You want to delete the comment?
            </Typography>
            <Box className="flex flex-row gap-2 justify-end pt-5">
              <Button
                variant="contained"
                onClick={handleClose}
                className="bg-white text-[#0079FF] hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                className="bg-[#CA3E47]"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const DeleteButton = ({ commentId, onDeleteComment }: PropsType) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    if (error) throw error;
    onDeleteComment();
  };

  return (
    <>
      <IconButton
        className="absolute top-[-4px] right-0 "
        title="Delete"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon className="text-sm" />
      </IconButton>

      {open && (
        <TransitionsModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default DeleteButton;
