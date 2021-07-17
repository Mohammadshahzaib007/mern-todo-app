import React from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { SigninCredentialType } from "../../types/types";

type PropsType = {
  loginHandler: (a: string, b: string) => void;
  authLoading: boolean;
};

function Signin(props: PropsType) {
  const { loginHandler, authLoading } = props;

  function validate(values: any) {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    } else if (values.password === "12345678") {
      errors.password = "Must not be 12345678 !!!";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => validate(values),
    onSubmit: (values) => loginHandler(values.email, values.password),
  });

  return (
    <Container>
      <Paper
        variant="outlined"
        style={{ padding: "1.25rem 1.875rem", marginTop: "3rem" }}
      >
        <Typography variant="h5">Signin</Typography>

        <form
          onSubmit={formik.handleSubmit}
          style={{ marginTop: "3rem" }}
          noValidate
        >
          <TextField
            color="primary"
            fullWidth
            label="E-mail"
            style={{ marginBottom: "1.5rem" }}
            variant="filled"
            name="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email ? formik.errors.email : ""}
          />
          <TextField
            color="primary"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Password"
            type="password"
            variant="filled"
            name="password"
            required
            error={!!formik.errors.password}
            helperText={formik.errors.password ? formik.errors.password : ""}
          />
          <Button
            style={{ marginTop: "2rem", width: "120px" }}
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={authLoading}
          >
            {authLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Login"
            )}
          </Button>

          <Link
            style={{ display: "block", color: "black", marginTop: "1rem" }}
            to="/signup"
          >
            Don't have an account?
          </Link>
        </form>
      </Paper>
    </Container>
  );
}

export default Signin;
