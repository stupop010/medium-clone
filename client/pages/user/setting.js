import { useState } from "react";
import useSWR from "swr";
import styled from "@emotion/styled";

import useAuth from "../../customHook/useAuth";

import Layout from "../../components/common/Layout";

import fetcherUser from "../../lib/utils/fetcherUser";

const SettingContainer = styled.div`
  width: 490px;
  margin: 50px auto;
  text-align: center;

  & h1 {
    font-size: 2.5rem;
  }

  & form {
    margin-top: 1rem;
  }
`;

const SettingInput = styled.input`
  width: 100%;
  margin: 0.3rem 0;
  font-size: 1.1rem;
`;

const SettingTextArea = styled.textarea`
  width: 100%;
  height: 170px;
`;

const Profile = () => {
  const { isLoggedIn, user } = useAuth();
  // const { data, error } = useSWR("/user", fetcherUser);

  // console.log(data, error);

  const initialState = {
    username: user.data ? user.data.name : "",
    bio: "",
    email: user.data ? user.data.email : "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <Layout>
      <SettingContainer>
        <h1>Your Setting</h1>
        <form>
          <fieldset>
            <SettingInput
              className="settings-fields"
              placeholder={values.username ? values.username : "Username"}
              value={values.username}
              name="username"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <SettingTextArea
              className="settings-fields"
              placeholder="Short bio about you"
              value={values.bio}
              name="bio"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <SettingInput
              className="settings-fields"
              placeholder={values.email ? values.email : "Email"}
              value={values.email}
              name="email"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <SettingInput
              className="settings-fields"
              placeholder="Password"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
          </fieldset>
        </form>
      </SettingContainer>
    </Layout>
  );
};

export default Profile;
