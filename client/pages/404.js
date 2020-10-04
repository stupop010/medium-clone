import Head from "next/head";
import styled from "@emotion/styled";

import Layout from "../components/common/Layout";

const Title = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
  text-align: center;
`;

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Chimi | Page Not Found!</title>
      </Head>
      <Layout>
        <Title>404 | Page Not Found!</Title>
      </Layout>
    </>
  );
}
