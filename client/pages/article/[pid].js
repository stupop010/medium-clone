import styled from "@emotion/styled";
import Link from "next/link";
import marked from "marked";

import Layout from "../../components/common/Layout";
import Container from "../../components/common/Container";
import ArticleMeta from "../../components/article/ArticleMeta";
import ArticleTagsList from "../../components/article/ArticleTagsList";
import ArticleComment from "../../components/article/ArticleComment";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import useAuth from "../../customHook/useAuth";

const AuthLink = styled.a`
  color: #2a9e96;

  &:hover {
    cursor: pointer;
    color: #2a9e96;
  }
`;

const ArticlePage = ({ article, pid }) => {
  const { isLoggedIn } = useAuth();
  if (!article) return <div>...loading</div>;

  const markup = {
    __html: marked(article.body),
  };

  return (
    <Layout>
      <ArticleMeta article={article} />
      <Container className="pt-5">
        <div dangerouslySetInnerHTML={markup}></div>

        <ArticleTagsList tags={article.tags} />

        <hr className="my-4" />

        {isLoggedIn ? (
          <ArticleComment />
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
    const res = await fetch(`${SERVER_BASE_URL}/article/${pid}`);
    const article = await res.json();

    return {
      props: {
        article,
        pid,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: { article: {} },
  };
}

export default ArticlePage;
