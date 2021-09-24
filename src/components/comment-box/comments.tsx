import React, { useState, useEffect } from "react";
import { Comment } from "./comment";
import { CommentForm } from "./comment-form";

import { getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateComment as updateCommentApi } from "./stabs/comments-api";

interface IComments {
  currentUserId?: string;
}
export function Comments({ currentUserId }: IComments) {
  const [backendComments, setBackendComments] = useState<any>([]);
  const [activeComment, setActiveComment] = useState<any>(null);

  const rootComments = backendComments.filter((backendComment: any) => backendComment.parentId === null);
  const getReplies = (commentId: any) => {
    return backendComments.filter((backendComment: any) => backendComment.parentId === commentId).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  const addComment = (text: string, parentId: any) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([...backendComments, comment]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId: any) => {
    if (window.confirm("Are you sure?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter((backendComment: any) => backendComment.id !== commentId);
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const updateComment = (text: any, commentId: any) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment: any) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-container">
        {rootComments.map((rootComment: any): any => {
          return <Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)} currentUserId={currentUserId} parentId={null} deleteComment={deleteComment} activeComment={activeComment} setActiveComment={setActiveComment} addComment={addComment} updateComment={updateComment} />;
        })}
      </div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
    </div>
  );
}
