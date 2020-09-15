import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "@emotion/styled";

import Layout from "../../components/common/Layout";
import InputTag from "../../components/editor/InputTag";
import DisplayTags from "../../components/editor/DisplayTags";
import Error from "../../components/common/Error";

import articleAPI from "../../lib/api/article";
import getStorage from "../../lib/utils/getStorage";
import checkAuth from "../../lib/utils/checkAuth";
import { UserContext } from "../../lib/context/user/userState";

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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) router.push("/user/login");
  }, [isLoggedIn]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleAddTag = (tag) => {
    setTags(tags.concat(tag));
  };

  const removeTag = (tag) => {
    setTags(tags.filter((i) => i !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, status } = await articleAPI.create(values, tags);

      if (status !== 200 || status !== 201) return setError(data.error);

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Article</title>
      </Head>
      <Layout>
        <ArticleContainer>
          <Error error={error} />
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="title"></label>
              <input
                name="title"
                type="text"
                placeholder="Article Title"
                className="auth-form w-100 mb-3"
                value={values.title}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="about"></label>
              <input
                name="about"
                type="text"
                placeholder="What's this article about?"
                className="auth-form w-100 mb-3"
                value={values.about}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="article"></label>
              <textarea
                name="body"
                className="auth-form w-100 mb-3 article-textarea"
                placeholder="What's your article (in markdown)"
                value={values.body}
                onChange={handleChange}
              ></textarea>
            </fieldset>
            <fieldset>
              <label htmlFor="title"></label>
              <InputTag handleAddTag={handleAddTag} />
            </fieldset>
            <DisplayTags tags={tags} removeTag={removeTag} />
            <button type="submit" className="auth-btn" disabled={isLoading}>
              Publish Article
            </button>
          </form>
        </ArticleContainer>
      </Layout>
    </>
  );
};

export default New;
