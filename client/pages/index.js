import Head from "next/head";

import styled from "@emotion/styled";

import Banner from "../components/home/Banner";
import TagList from "../components/home/TagList";
import Layout from "../components/common/Layout";
import Container from "../components/common/Container";
import ArticleList from "../components/article/articleList";

import useAuth from "../customHook/useAuth";

const HomeLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContentContainer = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
  padding: 0 15px;
`;

const AsideContainer = styled.div`
  flex: 0 0 25%;
  max-width: 75%;
  background-color: red;
  padding: 0 15px;
`;

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>Chimi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Banner />
        <Container className="pt-4">
          <HomeLayout>
            <ContentContainer>
              <TagList />
              <ArticleList />
            </ContentContainer>
            <AsideContainer>{/* <PopularTags /> */}</AsideContainer>
          </HomeLayout>
        </Container>
      </Layout>
    </>
  );
}
