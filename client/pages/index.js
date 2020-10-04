import { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "@emotion/styled";

import Banner from "../components/home/Banner";
import TagList from "../components/home/TagList";
import Layout from "../components/common/Layout";
import Container from "../components/common/Container";
import ArticleList from "../components/article/ArticleList";
import PopularTags from "../components/home/PopularTags";

import useAuth from "../customHook/useAuth";

import { SERVER_BASE_URL } from "../lib/utils/constant";
import fetcher from "../lib/utils/fetcher";

const HomeLayout = styled.main`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.section`
  flex: 0 0 75%;
  max-width: 75%;
  padding: 0 15px;

  @media (max-width: 768px) {
    flex: 100%;
    max-width: 100%;
  }
`;

const AsideContainer = styled.aside`
  flex: 0 0 25%;
  max-width: 75%;
  padding: 0 15px;
`;

export default function Home() {
  const { isLoggedIn } = useAuth();
  const { query, asPath } = useRouter();
  const { tag } = query;

  let getFetchURL = () => {
    switch (true) {
      case !!tag:
        return `${SERVER_BASE_URL}/article${asPath}`;
      default:
        return `${SERVER_BASE_URL}/article`;
    }
  };

  let fetchURL = useMemo(() => getFetchURL(), [tag]);

  const articles = useSWR(fetchURL, fetcher);

  return (
    <>
      <Head>
        <title>Chimi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <Banner />
          <Container className="pt-4">
            <HomeLayout>
              <ContentContainer>
                <TagList tag={tag} />
                <ArticleList articles={articles} />
              </ContentContainer>
              <AsideContainer>
                <PopularTags />
              </AsideContainer>
            </HomeLayout>
          </Container>
        </div>
      </Layout>
    </>
  );
}
