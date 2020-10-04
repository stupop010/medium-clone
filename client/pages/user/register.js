import { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";

import { UserContext } from "../../lib/context/user/userState";
import useAuth from "../../customHook/useAuth";

import Layout from "../../components/common/Layout";
import UserFormsHeading from "../../components/common/UserFormsHeading";
import RegisterForm from "../../components/profile/RegisterForm";

const FormContainer = styled.div`
  margin: 2rem auto;
  width: 420px;
`;

const Register = () => {
  const { isLoggedIn } = useAuth();
  const { updateUser } = useContext(UserContext);

  if (isLoggedIn) {
    Router.push("/");
  }

  return (
    <>
      <Head>
        <title>Chimi | Register</title>
      </Head>
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
    </>
  );
};

export default Register;
