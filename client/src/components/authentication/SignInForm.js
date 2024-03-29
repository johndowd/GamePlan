import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    setErrors(newErrors)
    return newErrors
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const newErrors = validateInput(userPayload)
    try {
      if (Object.keys(newErrors).length === 0) {
        setErrors({})
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        if (!response.ok) {
          if (response.status === 401) {
            setErrors({
              ...errors,
              login: "Incorrect Email/Password"
            })
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <a href="/users/new">Don't have an account? <b>Click here</b></a>
      <br />
      <FormError error={errors.login} />
      <form>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
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
            <FormError error={errors.password} />
          </label>
        </div>
        <p>username: email: knickfan99@notreal.com, pass: 123456</p>

        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  )
}

export default SignInForm;