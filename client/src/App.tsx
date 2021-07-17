import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

import Layout from "./components/Layout/Layout";
import Todo from "./components/Todo/Todo";
import { axios } from "../src/http/http";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";

function App() {
  const { addToast } = useToasts();

  const history = useHistory();

  const token = localStorage.getItem("token");

  const [state, setState] = useState<{
    isAuth: boolean;
    token: null | string;
    userId: null | string;
    authLoading: boolean;
    error: null | string;
    name: null | string;
  }>({
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    name: null,
  });

  // useEffect(() => {
  //   if (token === null) {
  //     history.push("/signin");
  //   }
  // }, []);

  // login handler
  const loginHandler = async (email: string, password: string) => {
    try {
      setState((prevState) => {
        return { ...prevState, authLoading: true, isAuth: true };
      });
      const { data } = await axios.post<{
        success: boolean;
        token: string;
        userId: string;
        message: string;
        name: string;
      }>("auth/signin", { email: email.toLowerCase(), password });
      if (data.success) {
        setState({
          isAuth: true,
          token: data.token,
          userId: data.userId,
          authLoading: false,
          error: null,
          name: data.name,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        history.push("/all-todos");
        window.location.reload();
        addToast(data.message ? data.message : "login Successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(data.message ? data.message : "Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(error.message ? error.message : "Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
      setState((prevState) => {
        return { ...prevState, isAuth: false };
      });
    } finally {
      setState((prevState) => {
        return { ...prevState, authLoading: false };
      });
    }
  };

  // signup handler
  const signupHandler = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      setState((prevState) => {
        return { ...prevState, authLoading: true };
      });
      const { data } = await axios.post<{
        success: boolean;
        message: string;
        userId: string;
        emailError: string;
      }>("auth/signup", {
        email: email.toLowerCase(),
        password,
        name,
      });
      if (data.success) {
        addToast(
          data.message
            ? data.message
            : "User created Successfully, Please login to go to dashboard",
          {
            appearance: "success",
            autoDismiss: true,
          }
        );
        history.push("/signin");
      } else if (data.emailError) {
        addToast(data.emailError ? data.emailError : "Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(data.message ? data.message : "Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } finally {
      setState((prevState) => {
        return { ...prevState, authLoading: false, name: null };
      });
    }
  };

  // logout handler
  const logoutHandler = () => {
    setState((prevState) => {
      return { ...prevState, isAuth: false, token: null, userId: null };
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    history.push("/signin");
  };

  return (
    <div>
      <Layout state={state} logoutHandler={logoutHandler}>
        <Switch>
          {token && (
            <Route
              path="/"
              render={(props) => <Todo {...props} isAuth={state.isAuth} />}
            />
          )}
          {token === null && (
            <Route
              exact
              path="/signin"
              render={(props) => (
                <Signin
                  {...props}
                  loginHandler={loginHandler}
                  authLoading={state.authLoading}
                />
              )}
            />
          )}
          {token === null && (
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  signupHandler={signupHandler}
                  authLoading={state.authLoading}
                />
              )}
            />
          )}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
