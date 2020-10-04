import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ArticleTagsList from "./ArticleTagsList";

import articleAPI from "../../lib/api/article";

const CardContainer = styled.div`
  border-top: 1px solid #a5a5a5;
  padding: 20px 0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardAvatar = styled.div`
  & img {
    height: 40px;
    margin-right: 5px;
  }
`;

const CardFollow = styled.div`
  color: #2a9e96;
  border: 1px solid #2a9e96;
  border-radius: 3px;
  padding: 2px 3px;
  cursor: pointer;
  transition: 0.3s;

  & span {
    margin-left: 2px;
  }

  &:hover {
    background-color: #2a9e96;
    color: white;
  }
`;

const CardBody = styled.div`
  padding: 10px 0;

  & h2 {
    font-size: 2rem;
  }

  & p {
    opacity: 0.8;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    font-size: 0.8rem;
  }
`;

const ArticleCard = ({ article }) => {
  const [followsCount, setFollowsCount] = useState(article.follows.length);

  const handleFollow = async () => {
    const { status } = await articleAPI.addFollow(article.id);

    if (status === 201) {
      setFollowsCount(followsCount + 1);
    }
  };

  return (
    <CardContainer>
      {article && (
        <>
          <CardHeader>
            <div className="d-flex">
              <CardAvatar>
                <img src="/default-avatar.png" alt="default avatar" />
              </CardAvatar>
              <div>
                <Link
                  href="/profile/[user]"
                  as={`/profile/${encodeURIComponent(article.user.name)}`}
                >
                  <a className="d-block article-card-user">
                    {article.user.name}
                  </a>
                </Link>
                <span className="d-block article-card-date">
                  {new Date(article.createdAt).toDateString()}
                </span>
              </div>
            </div>
            <CardFollow onClick={handleFollow}>
              <FontAwesomeIcon icon={faHeart} />
              <span>{followsCount}</span>
            </CardFollow>
          </CardHeader>

          <CardBody>
            <Link href="/article/[pid]" as={`/article/${article.slug}`}>
              <a>
                <h2>{article.title}</h2>
                <p>{article.about}</p>
              </a>
            </Link>
          </CardBody>

          <CardFooter>
            <Link href="/article/[pid]" as={`/article/${article.slug}`}>
              <a>Read more...</a>
            </Link>
            <div style={{ maxWidth: "250px" }}>
              <ArticleTagsList tags={article.tags} />
            </div>
          </CardFooter>
        </>
      )}
    </CardContainer>
  );
};

export default ArticleCard;
