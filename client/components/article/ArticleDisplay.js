import marked from "marked";

import ArticleTagsList from "../../components/article/ArticleTagsList";

const ArticleDisplay = ({ article }) => {
  if (!article) return null;

  const markup = {
    __html: marked(article.body),
  };

  return (
    <>
      <div dangerouslySetInnerHTML={markup}></div>

      <ArticleTagsList tags={article.tags} />
    </>
  );
};

export default ArticleDisplay;
