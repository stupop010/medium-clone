import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import Layout from "../../components/common/Layout";
import Container from "../../components/common/Container";
import Error from "../../components/common/Error";
import ArticleMeta from "../../components/article/ArticleMeta";
import ArticleCommentField from "../../components/article/ArticleCommentField";
import ArticleCommentList from "../../components/article/ArticleCommentList";
import ArticleDisplay from "../../components/article/ArticleDisplay";
import ArticleCommentPagination from "../../components/article/ArticleCommentPagination";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import commentAPI from "../../lib/api/comment";
import useAuth from "../../customHook/useAuth";

const AuthLink = styled.a`
  color: #2a9e96;

  &:hover {
    cursor: pointer;
    color: #2a9e96;
  }
`;

const CommentContainer = styled.div`
  max-width: 570px;
  margin: auto;
  padding: 2rem;
`;

const COMMENTS_PER_PAGE = 10;

const ArticlePage = ({ commentsList, count, article, pid, err }) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const { isLoggedIn, user } = useAuth();
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setComments(commentsList);
    setCommentCount(count);
  }, [commentsList, count]);

  useEffect(() => {
    const errorTimer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);

  const handleDeleteComment = async (commentId) => {
    try {
      const { data, status } = await commentAPI.deleteComment(
        commentId,
        article.id,
        COMMENTS_PER_PAGE,
        offset
      );

      if (status === 403) {
        setError(data.message);
      } else {
        setComments(data);
      }
    } catch (err) {
      console.log(err);
      setError("Server Error");
    }
  };

  return (
    <Layout>
      {article && <ArticleMeta article={article} />}
      <Container className="pt-5">
        {err && <div>Error fetching article</div>}
        {!article && !err && <div>...loading</div>}

        <ArticleDisplay article={article} />

        <hr className="my-4" />

        {isLoggedIn && article ? (
          <CommentContainer>
            <ArticleCommentField
              articleId={article.id}
              setComments={setComments}
              limit={COMMENTS_PER_PAGE}
              offset={offset}
            />
            {error && <Error error={error} />}
            <ArticleCommentList
              comments={comments}
              userId={user.id}
              handleDeleteComment={handleDeleteComment}
            />
            <ArticleCommentPagination
              count={commentCount}
              commentsPerPage={COMMENTS_PER_PAGE}
            />
          </CommentContainer>
        ) : (
          <div>
            <p>
              <Link href="/user/login">
                <AuthLink>Sign in</AuthLink>
              </Link>{" "}
              or{" "}
              <Link href="/user/register">
                <AuthLink>sign up</AuthLink>
              </Link>{" "}
              to add comments on this article.
            </p>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { pid } = params;

  try {
    const resArticle = await fetch(`${SERVER_BASE_URL}/article/${pid}`);
    const article = await resArticle.json();

    const resComment = await fetch(
      `${SERVER_BASE_URL}/comment/${article.id}?limit=${COMMENTS_PER_PAGE}`
    );
    const comments = await resComment.json();

    return {
      props: {
        count: comments.count,
        commentsList: comments.rows,
        article,
        pid,
      },
    };
  } catch (err) {
    return { props: { err: err.message } };
  }
}

export default ArticlePage;
