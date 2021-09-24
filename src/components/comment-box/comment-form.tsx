import React, { useState } from "react";
export interface ICommentForm {
  submitLabel: any;
  handleSubmit: any;
  hasCancelButton?: any;
  handleCancel?: any;
  initialText?: any;
}
export function CommentForm({ submitLabel, handleSubmit, hasCancelButton = false, handleCancel, initialText = "" }: ICommentForm) {
  const [text, setText] = useState<any>(initialText);
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea className="comment-form-textarea" value={text} onChange={(e: any) => setText(e.currentTarget.value)} />
      <button disabled={text ? false : true} className="comment-form-button">
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button className="comment-form-button comment-form-cancel-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
