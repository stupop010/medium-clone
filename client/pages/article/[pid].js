import { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import Layout from "../../components/common/Layout";
import Container from "../../components/common/Container";
import ArticleMeta from "../../components/article/ArticleMeta";
import ArticleCommentField from "../../components/article/ArticleCommentField";
import ArticleCommentList from "../../components/article/ArticleCommentList";
import ArticleDisplay from "../../components/article/ArticleDisplay";
import ArticleCommentPagination from "../../components/article/ArticleCommentPagination";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import useAuth from "../../customHook/useAuth";

const AuthLink = styled.a`
  color: #2a9e96;

  &:hover {
    cursor: pointer;
    color: #2a9e96;
  }
`;

const ArticlePage = ({ commentsList, count, article, pid, err }) => {
  const [comments, setComments] = useState(commentsList);
  const [commentCount, setCommentCount] = useState(count);
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      {article && <ArticleMeta article={article} />}
      <Container className="pt-5">
        {err && <div>Error fetching article</div>}
        {!article && !err && <div>...loading</div>}

        <ArticleDisplay article={article} />

        <hr className="my-4" />

        {isLoggedIn && article ? (
          <>
            <ArticleCommentField articleId={article.id} />
            <ArticleCommentList comments={comments} />
            <ArticleCommentPagination count={commentCount} />
          </>
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

    const resComment = await fetch(`${SERVER_BASE_URL}/comment/${article.id}`);
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
