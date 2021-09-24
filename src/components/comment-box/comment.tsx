import React from "react";
import { CommentForm } from "./comment-form";
interface IComment {
  comment?: any;
  replies?: any;
  currentUserId: any;
  deleteComment?: any;
  addComment?: any;
  updateComment?: any;
  activeComment?: any;
  setActiveComment?: any;
  parentId: any;
}
export function Comment({ comment, replies, currentUserId, deleteComment, addComment, updateComment, activeComment, setActiveComment, parentId = null }: IComment) {
  const canReply = !!currentUserId;
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className="comment-created-at">{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text"> {comment.body}</div>}
        {isEditing && <CommentForm submitLabel="Update" hasCancelButton initialText={comment.body} handleSubmit={(text: any) => updateComment(text, comment.id)} handleCancel={() => setActiveComment(null)} />}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "replying",
                })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "editing",
                })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div className="comment-action" onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>
        {isReplying && <CommentForm submitLabel="Reply" handleSubmit={(text: any) => addComment(text, replyId)} />}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply: any) => (
              <Comment comment={reply} key={reply.id} replies={[]} currentUserId={currentUserId} deleteComment={deleteComment} addComment={addComment} updateComment={updateComment} activeComment={activeComment} setActiveComment={setActiveComment} parentId={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
