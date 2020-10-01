import { useState } from "react";
import styled from "@emotion/styled";

import Error from "../common/Error";

import commentAPI from "../../lib/api/comment";
import useTimeoutError from "../../customHook/useTimeoutError";

const CommentContainer = styled.div`
  padding: 1.5rem;
  border: 1px solid #ededed;
  border-radius: 5px;

  & form {
    display: flex;
    flex-direction: column;
  }

  & textarea {
    padding: 10px;
    height: 80px;
  }

  & button {
    align-self: flex-end;
    padding: 0.4rem 1rem;
    margin-top: 0.5rem;
    border: 1px solid #2a9e96;
    border-radius: 5px;
    background-color: transparent;
    color: #2a9e96;
    transition: 0.3s;

    &:hover {
      color: white;
      background-color: #2a9e96;
    }
  }
`;

const ArticleCommentField = ({
  articleId,
  updateCommentAndCount,
  limit,
  offset,
}) => {
  const [error, setError] = useTimeoutError();
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, status } = await commentAPI.createComment({
        textValue,
        articleId,
        offset,
        limit,
      });

      if (status === 422) {
        setError(data.error);
      } else {
        updateCommentAndCount(data.rows, data.count);
        setTextValue("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContainer>
      {error && <Error error={error} />}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Post Comment
        </button>
      </form>
    </CommentContainer>
  );
};

export default ArticleCommentField;
