import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const List = styled.ul`
  display: flex;
  padding: 10px 5px;

  & li {
    margin-right: 10px;
  }
`;

const ActiveLink = styled.a`
  color: ${({ active }) => (active ? "#2A9E96" : null)};
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    color: #2a9e96;
  }
`;

const TagList = ({ tag }) => {
  const { asPath } = useRouter();

  return (
    <div>
      <List>
        <li>
          <Link href="/">
            <ActiveLink active={asPath === "/" ? true : false}>
              Global Feed
            </ActiveLink>
          </Link>
        </li>
        <li>
          {tag ? (
            <Link href={`${asPath}`} as={`${asPath}`}>
              <a>
                <span>#</span>
                {tag}
              </a>
            </Link>
          ) : (
            ""
          )}
        </li>
      </List>
    </div>
  );
};

export default TagList;
