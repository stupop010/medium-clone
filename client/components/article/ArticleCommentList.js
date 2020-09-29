import { useState } from "react";

const ArticleCommentList = ({ comments }) => {
  if (!comments) return null;

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  );
};

export default ArticleCommentList;
