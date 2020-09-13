import Head from "next/head";
import useSWR from "swr";
import styled from "@emotion/styled";

import Banner from "../components/home/Banner";
import TagList from "../components/home/TagList";
import Layout from "../components/common/Layout";
import Container from "../components/common/Container";
import ArticleList from "../components/article/articleList";

import getStorage from "../lib/utils/getStorage";

const HomeLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContentContainer = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
`;

const AsideContainer = styled.div`
  flex: 0 0 25%;
  max-width: 75%;
  background-color: red;
`;

export default function Home() {
  const { data } = useSWR("user", getStorage);

  return (
    <>
      <Head>
        <title>Create Next App</title>
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
            <AsideContainer>
              {/* <PopularTags /> */}
              <div>s</div>
            </AsideContainer>
          </HomeLayout>
        </Container>
      </Layout>
    </>
  );
}
