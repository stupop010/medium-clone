import Link from "next/link";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  margin-top: 0.8rem;
  border: 1px solid #ededed;
  border-radius: 5px;
`;

const Comment = styled.div`
  padding: 0.5rem;
  & p {
    margin: 0;
  }
`;

const CommentUser = styled.div`
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-top: 1px solid #ededed;
  font-size: 0.8rem;

  & a {
    display: flex;
    align-items: center;

    & span {
      margin-left: 5px;
      color: #2a9e96;
    }
  }
`;

const Delete = styled.span`
  cursor: pointer;
`;

const ArticleCommentList = ({ comments, userId, handleDeleteComment }) => {
  if (!comments) return null;

  return (
    <div>
      {comments.map((comment) => (
        <Container key={comment.id}>
          <Comment>
            <p>{comment.comment}</p>
          </Comment>
          <CommentUser>
            <Link href={`/profile/${encodeURIComponent(comment.user.name)}`}>
              <a>
                <img
                  src="/default-avatar.png"
                  alt="default avatar"
                  width="25px"
                />
                <span>{comment.user.name}</span>
              </a>
            </Link>
            <span className="ml-1">
              {new Date(comment.createdAt).toDateString()}
            </span>
            {comment.user.id === userId ? (
              <Delete className="ml-1">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDeleteComment(comment.id)}
                />
              </Delete>
            ) : null}
          </CommentUser>
        </Container>
      ))}
    </div>
  );
};

export default ArticleCommentList;
