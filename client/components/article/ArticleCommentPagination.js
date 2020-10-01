import { useState } from "react";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_GB";

import commentAPI from "../../lib/api/comment";

const ArticleCommentPagination = ({
  count,
  commentsPerPage,
  updateCommentAndCount,
  setOffset,
  articleId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = async (current, pageSize) => {
    const offset = (current - 1) * pageSize;
    const { data } = await commentAPI.fetchPaginationComment(
      articleId,
      pageSize,
      offset
    );

    updateCommentAndCount(data.rows, data.count);

    setOffset(offset);
    setCurrentPage(current);
  };

  return (
    <div className="mt-3">
      <Pagination
        total={count}
        pageSize={commentsPerPage}
        current={currentPage}
        defaultPageSize={commentsPerPage}
        locale={localeInfo}
        onChange={onChange}
        hideOnSinglePage={true}
        className="d-flex justify-content-center"
      />
    </div>
  );
};

export default ArticleCommentPagination;
