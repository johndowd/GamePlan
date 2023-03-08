import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import ErrorList from "../layout/ErrorList";
import translateServerErrors from "../../services/translateServerErrors";
import UserClient from "../../services/apiClient/UserClient";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: ""
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, username } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }
    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }
    setErrors(newErrors);
    return newErrors
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateInput(userPayload)
    if (Object.keys(formErrors).length === 0) {
      const res = await UserClient.createUser(userPayload)
      if (res?.errors) {
        setErrors({
          ...errors,
          ...res.errors
        })
      } else {
        setShouldRedirect(true)
      }
    }
  }


  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <ErrorList errors={errors} />
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
          </label>
        </div>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={userPayload.username}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
