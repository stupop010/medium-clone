import { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";

import Layout from "../../components/common/Layout";
import InputTag from "../../components/editor/InputTag";

const ArticleContainer = styled.section`
  width: 670px;
  margin: 30px auto;
`;

const initialState = {
  title: "",
  about: "",
  body: "",
};

const New = () => {
  const [values, setValues] = useState(initialState);
  const [tags, setTags] = useState([]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.values });

  const handleAddTag = (tag) => {
    setTags(tags.concat(tag));
  };

  return (
    <>
      <Head>
        <title>New Article</title>
      </Head>
      <Layout>
        <ArticleContainer>
          <form className="d-flex flex-column">
            <fieldset>
              <label htmlFor="title"></label>
              <input
                name="title"
                type="text"
                placeholder="Article Title"
                className="auth-form w-100 mb-3"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="about"></label>
              <input
                name="about"
                type="text"
                placeholder="What's this article about?"
                className="auth-form w-100 mb-3"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="article"></label>
              <textarea
                name="body"
                className="auth-form w-100 mb-3 article-textarea"
                placeholder="What's your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset>
              <label htmlFor="title"></label>
              <InputTag handleAddTag={handleAddTag} />
            </fieldset>
            {tags.length > 0 && tags.map((tag) => <div>{tag}</div>)}
            <button type="submit" className="auth-btn">
              Publish Article
            </button>
          </form>
        </ArticleContainer>
      </Layout>
    </>
  );
};

export default New;
