import useSWR from "swr";

import ErrorMessage from "../common/Error";
import ArticleCard from "./articleCard";

import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";

const ArticleList = () => {
  const { data, error } = useSWR(`${SERVER_BASE_URL}/article`, fetcher);

  if (!data) return null;
  if (error) return <ErrorMessage error="Can't load recent article" />;
  if (data.length === 0) return <ErrorMessage error="No articles yet..." />;

  return (
    <div>
      {/* {data.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))} */}
    </div>
  );
};

export default ArticleList;
