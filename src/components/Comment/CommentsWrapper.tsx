'use client';

import AddComment from './AddComment';
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { CommentType } from '@/types/Comment/CommentType';
import { supabase } from '@/db/supabaseClient';

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

  const handleEditComment = (idComment: number) => {
    setIdComment(idComment);
  };

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select()
        .eq('movie_id', movieId);

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
        }}
      />
    </>
  );
};

export default CommentsWrapper;
