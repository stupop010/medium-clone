import styled from "@emotion/styled";
import Link from "next/link";

const PageHeader = styled.div`
  padding: 2rem;
  background-color: black;
  color: white;

  & > div {
    width: 95%;
    margin: auto;
  }
`;

const UserInfo = styled.div`
  display: flex;
  margin-top: 1.8rem;
  line-height: 0.8;

  & img {
    height: 40px;
    margin-right: 5px;
  }

  & a {
    display: block;
    font-size: 0.9rem;
    padding: 0;
    margin: 0;
    transition: 0.3s;

    &:hover {
      color: #2a9e96;
    }
  }

  & span {
    font-size: 0.7rem;
    color: #cccccc;
  }
`;

const ArticleMeta = ({ article }) => (
  <PageHeader>
    <div>
      <h1>{article.title}</h1>
      <UserInfo>
        <img src="/light-avatar.png" alt="default avatar" />

        <div className="mt-2">
          <Link
            href="/profile/[user]"
            as={`/profile/${encodeURIComponent(article.user.name)}`}
          >
            <a>{article.user.name}</a>
          </Link>
          <span>{new Date(article.createdAt).toDateString()}</span>
        </div>
      </UserInfo>
    </div>
  </PageHeader>
);

export default ArticleMeta;
