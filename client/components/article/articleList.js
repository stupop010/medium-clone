import useSWR from "swr";
import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";

const ArticleList = () => {
  const data = useSWR(`${SERVER_BASE_URL}/article`, fetcher);
  return (
    <div>
      <p>s</p>
    </div>
  );
};

export default ArticleList;
