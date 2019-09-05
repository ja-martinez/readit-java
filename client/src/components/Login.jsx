import React, { useState } from "react";
import { AuthConsumer } from './AuthContext'

export default function Login({ history }) {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: ""
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [loginIncorrect, setLoginIncorrect] = useState(false)

  const handleRegisterChange = e => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-register">
      <AuthConsumer>
        {({ login, user, register }) => (
          <>
            <div className="card login">
              <h1 className="card-header">Login</h1>
              <form onSubmit={
                async e => {
                  e.preventDefault();
                  let incorrect = await login(loginForm.username, loginForm.password)
                  if (incorrect) {
                    setLoginIncorrect(true)
                  } else {
                    history.goBack()
                  }
                }
              }>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleLoginChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleLoginChange}
                  required
                />
                <input type="submit" value="Login" />
              </form>
              {loginIncorrect && <h3>Login information is incorrect</h3>}
            </div>
            <div className="card register">
              <h1 className="card-header">Register</h1>
              <form onSubmit={
                e => {
                  e.preventDefault()
                  register(registerForm.username, registerForm.password)
                  history.goBack()
                }
              }>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleRegisterChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleRegisterChange}
                  required
                />
                <input type="submit" value="Register" />
              </form>
            </div>
          </>
        )}
      </AuthConsumer>
    </div>
  );
}
