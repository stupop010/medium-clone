import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";

import Layout from "../../components/common/Layout";
import ArticleCard from "../../components/article/ArticleCard";

import { SERVER_BASE_URL } from "../../lib/utils/constant";

const Banner = styled.div`
  background-color: #f3f3f3;
  text-align: center;
`;

const ArticleContainer = styled.div`
  width: 570px;
  margin: auto;
`;

const Profile = ({ userData, status }) => {
  useEffect(() => {
    if (status === 404) {
      return Router.push("/404");
    }
  }, [status, userData]);

  return (
    <>
      <Head>
        <title>Chimi | {userData ? userData.name : ""}</title>
      </Head>
      <Layout>
        <Banner className="py-4">
          <div className="py-3">
            <img
              src="/default-avatar.png"
              alt="Default avatar"
              width="70px"
              className="mb-2"
            />
            {userData ? <h2>{userData.name}</h2> : <p>..loading</p>}
          </div>
        </Banner>
        {userData && (
          <ArticleContainer className="pt-5">
            <p className="pl-1">My Articles</p>
            {userData.articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </ArticleContainer>
        )}
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { user } = params;

  try {
    const response = await fetch(`${SERVER_BASE_URL}/profile/${user}`);

    const userData = await response.json();
    const status = response.status;

    return {
      props: { userData, status },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

export default Profile;
