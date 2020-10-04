import Error from "../common/Error";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => {
  const { data, error } = articles;

  if (!data) return null;
  if (error) return <Error error="Can't load recent article" />;
  if (data.length === 0) return <Error error="No articles yet..." />;

  return (
    <div>
      {data.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};

export default ArticleList;
