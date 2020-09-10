import Link from "next/link";
import styled from "@emotion/styled";

import Layout from "../../components/common/Layout";
import LoginForm from "../../components/profile/LoginForm";
import UserFormsHeading from "../../components/common/UserFormsHeading";

const FormContainer = styled.div`
  margin: 2rem auto;
  width: 420px;
`;

const Login = () => {
  return (
    <Layout>
      <FormContainer>
        <UserFormsHeading>
          {/*  more styles for below are in userFormsHeading styled component */}
          <h2 className="my-3">Sign In</h2>
          <Link href="/user/register">
            <a className="mb-1">Need an account?</a>
          </Link>
        </UserFormsHeading>

        <LoginForm />
      </FormContainer>
    </Layout>
  );
};

export default Login;
