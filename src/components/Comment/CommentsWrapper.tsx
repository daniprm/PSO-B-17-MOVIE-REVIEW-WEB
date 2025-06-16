'use client';

import AddComment from './AddComment';
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { CommentType } from '@/types/Comment/CommentType';
import { supabase } from '@/db/supabaseClient';
import { createClient } from '@/Utilities/supabase/client';
const supabaseClient = createClient();

const CommentsWrapper = ({
  movieId,
  commentsData,
}: {
  movieId: string;
  commentsData: CommentType[];
}) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentType[]>(commentsData);
  const [idComment, setIdComment] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');

  const handleEditComment = (idComment: number) => {
    setIdComment(idComment);
  };

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select()
        .eq('movie_id', movieId);
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      const userId = await user?.id;
      const currentUserEmail = await user?.email;

      setUserId(userId);
      setCurrentUserEmail(currentUserEmail!);
      setComments(data!);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  return (
    <>
      <AddComment
        comment={comment}
        setComment={setComment}
        movieId={movieId}
        fetchComments={fetchComments}
        userId={userId!}
      />
      <Comments
        {...{
          comments,
          idComment,
          setIdComment,
          editedComment,
          setEditedComment,
          handleEditComment,
          fetchComments,
          currentUserEmail,
        }}
      />
    </>
  );
};

export default CommentsWrapper;
