import styled from "@emotion/styled";

const Heading = styled.div`
  text-align: center;

  & h2 {
    font-size: 2.6rem;
  }

  & a {
    display: block;
    color: #2a9e96;
    opacity: 0.7;
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }
  }
`;

const UserFormsHeading = ({ children }) => <Heading>{children}</Heading>;

export default UserFormsHeading;
