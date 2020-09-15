import { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { UserContext } from "../../lib/context/user/userState";

import Layout from "../../components/common/Layout";
import UserFormsHeading from "../../components/common/UserFormsHeading";
import RegisterForm from "../../components/profile/RegisterForm";

const FormContainer = styled.div`
  margin: 2rem auto;
  width: 420px;
`;

const Register = () => {
  const { updateUser } = useContext(UserContext);

  return (
    <Layout>
      <FormContainer>
        <UserFormsHeading>
          {/*  more styles for below are in userFormsHeading styled component */}
          <h2 className="my-3">Sign up</h2>
          <Link href="/user/login">
            <a className="mb-1">Have an account?</a>
          </Link>
        </UserFormsHeading>

        <RegisterForm updateUser={updateUser} />
      </FormContainer>
    </Layout>
  );
};

export default Register;
