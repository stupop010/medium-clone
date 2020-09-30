import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCog } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

import Container from "./Container";

const Logo = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: #2a9e96;
`;

const List = styled.ul`
  list-style: none;

  & li {
    font-size: 1.1rem;
    padding-left: 15px;
    text-transform: capitalize;
    color: #a9aaaa;
  }

  & a {
    transition: 0.3s;

    &:hover {
      color: #222323;
    }
  }
`;

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      <Container className="d-flex py-3 justify-content-between align-items-center">
        <Logo>Chimi</Logo>
        <List className="d-flex">
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <Link href="/user/login">
                  <a>login</a>
                </Link>
              </li>
              <li>
                <Link href="/user/register">
                  <a>sign up</a>
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link href="/editor/new">
                  <a>
                    <FontAwesomeIcon icon={faEdit} /> new
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/user/setting">
                  <a>
                    <FontAwesomeIcon icon={faUserCog} /> setting
                  </a>
                </Link>
              </li>
            </>
          )}
        </List>
      </Container>
    </nav>
  );
};

export default Navbar;
