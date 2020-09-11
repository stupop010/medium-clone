import styled from "@emotion/styled";

const List = styled.ul`
  display: flex;
  padding: 10px 5px;

  & li {
    margin-right: 10px;
  }
`;

const TagList = () => {
  return (
    <div>
      <List>
        <li>Global Feed</li>
        <li>hashtag</li>
      </List>
    </div>
  );
};

export default TagList;
