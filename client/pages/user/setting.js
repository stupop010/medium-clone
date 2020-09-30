import { useState, useContext } from "react";
import Router from "next/router";
import { mutate } from "swr";
import styled from "@emotion/styled";

import { UserContext } from "../../lib/context/user/userState";
import localStorageService from "../../lib/utils/localStorageService";
import userAPI from "../../lib/api/user";
import useAuth from "../../customHook/useAuth";

import Layout from "../../components/common/Layout";
import Error from "../../components/common/Error";

const SettingContainer = styled.div`
  width: 490px;
  margin: 50px auto;
  text-align: center;

  & h1 {
    font-size: 2.5rem;
  }

  & form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
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

const SubmitButton = styled.button`
  display: inline-block;
  margin: 0.7rem 0;
  padding: 0.7rem 1.4rem;
  font-size: 1.3rem;
  color: white;
  background-color: #2a9e96;
  border: none;
  border-radius: 5px;
  opacity: 0.8;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const LogoutButton = styled.button`
  display: inline-block;
  border: 1px solid #a32d2d;
  color: #a32d2d;
  background: transparent;
  border-radius: 5px;
  padding: 0.3rem 1rem;
  margin-top: 0.7rem;
  transition: 0.3s;

  &:hover {
    background-color: #a32d2d;
    color: white;
  }
`;

const Profile = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState("");
  const { logoutUser, updateUser } = useContext(UserContext);
  const { isLoggedIn, user, loading } = useAuth();

  const initialState = {
    username: user.data ? user.data.name : "",
    // TODO: Bio is null and it will throw a error in textArea if null
    bio: user.data ? user.data.bio : "",
    email: user.data ? user.data.email : "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  if (loading) return <div>...loading</div>;
  if (!isLoggedIn) Router.push("/");

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProfileLoading(true);

    try {
      const { data } = await userAPI.update(values);

      updateUser(data);
    } catch (err) {
      setError(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorageService.removeTokens();
    console.log("handle logout");
    logoutUser();
  };

  return (
    <Layout>
      <SettingContainer>
        <h1>Your Setting</h1>
        <form onSubmit={handleSubmit}>
          {error && <Error error={error} />}
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
              placeholder={values.bio ? values.bio : "Short bio about you"}
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
          <div className="d-flex  justify-content-end">
            <SubmitButton type="submit" disabled={profileLoading}>
              Update Setting
            </SubmitButton>
          </div>
        </form>

        <hr className="my-2" />

        <div className="d-flex justify-content-start">
          <LogoutButton onClick={handleLogout} disabled={profileLoading}>
            or click here to logout
          </LogoutButton>
        </div>
      </SettingContainer>
    </Layout>
  );
};

export default Profile;
