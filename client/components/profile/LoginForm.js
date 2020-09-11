import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import ErrorMessage from "../common/Error";
import userAPI from "../../lib/api/user";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data, status } = await userAPI.login(values);

      setErrors("");
      if (status !== 200) {
        setErrors(data.error);
      }

      if (data.email) {
        setValues(initialState);
        const user = { ...data };
        window.localStorage.setItem("user", JSON.stringify(user));
        mutate("user", user);
        router.push("/");
      }
    } catch (err) {
      setErrors(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <ErrorMessage error={errors} />
      <fieldset>
        <label htmlFor="email"></label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-3 mt-2 w-100 auth-form"
        />
      </fieldset>

      <fieldset>
        <label htmlFor="password"></label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-3 w-100 auth-form"
        />
      </fieldset>
      <button type="submit" className="mb-3 auth-btn" disabled={isLoading}>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
