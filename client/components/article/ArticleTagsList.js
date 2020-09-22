import styled from "@emotion/styled";

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
`;

const ArticleTagsList = ({ tags }) => (
  <>
    {tags && (
      <TagList>
        {tags.map((tag) => (
          <Tag key={tag.id}>{tag.tag}</Tag>
        ))}
      </TagList>
    )}
  </>
);

export default ArticleTagsList;
