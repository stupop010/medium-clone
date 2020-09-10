import styled from "@emotion/styled";

const ErrorMessage = styled.div`
  margin: 1rem auto;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  background-color: #a5081a;
  color: white;
`;

const Error = ({ error }) => {
  return error ? <ErrorMessage>{error}</ErrorMessage> : null;
};

export default Error;
