import styled from "@emotion/styled";
import Link from "next/link";

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  margin-top: 3px;
  margin-right: 3px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  color: #d8d8d8;
  border: 1px solid #d8d8d8;
  border-radius: 15px;
  transition: 0.3s;

  &:hover {
    color: #fff;
    background-color: #687077;
    border-color: #687077;
  }
`;

const ArticleTagsList = ({ tags }) => {
  return (
    <>
      {tags && (
        <TagList>
          {tags.map(({ id, tag }) => (
            <Tag key={id}>
              <Link href={`/?tag=${tag}`} as={`/?tag=${tag}`}>
                <a>{tag}</a>
              </Link>
            </Tag>
          ))}
        </TagList>
      )}
    </>
  );
};

export default ArticleTagsList;
