import { useState } from "react";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_GB";

const ArticleCommentPagination = ({ count, commentsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (current, pageSize) => {
    console.log(current, pageSize);
    setCurrentPage(current);
  };
  return (
    <div>
      <p>{count}</p>
      <Pagination
        total={count}
        pageSize={commentsPerPage}
        current={currentPage}
        defaultPageSize={commentsPerPage}
        locale={localeInfo}
        onChange={onChange}
        hideOnSinglePage={true}
      />
    </div>
  );
};

export default ArticleCommentPagination;
