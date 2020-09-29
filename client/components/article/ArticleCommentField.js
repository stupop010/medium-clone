import { useState } from "react";
import styled from "@emotion/styled";
import articleAPI from "../../lib/api/article";

const CommentContainer = styled.div`
  max-width: 490px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ededed;

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

const ArticleCommentField = ({ articleId }) => {
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await articleAPI.createComment({ textValue, articleId });

      setTextValue("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContainer>
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
