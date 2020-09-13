import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  margin-right: 5px;
  padding: 2px 8px;
  background-color: #636363;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
`;

const DisplayTags = ({ tags, removeTag }) => {
  return (
    <>
      {tags.length > 0 && (
        <div>
          <List>
            {tags.map((tag, i) => (
              <ListItem key={i}>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => removeTag(tag)}
                  className="tag-cross"
                />
                {tag}
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default DisplayTags;
