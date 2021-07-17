import React, { useState } from "react";

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

type PropsType = {
  signupHandler: (a: string, b: string, c: string) => void;
  authLoading: boolean;
};
function Signup(props: PropsType) {
  const { signupHandler, authLoading } = props;

  function validate(values: any) {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 2) {
      errors.name = "Must be 2 characters or more";
    }

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
      name: "",
    },
    validate: (values) => validate(values),
    onSubmit: (values) =>
      signupHandler(values.email, values.password, values.name),
  });

  return (
    <Container>
      <Paper
        variant="outlined"
        style={{ padding: "1.25rem 1.875rem", marginTop: "3rem" }}
      >
        <Typography variant="h5">Signup</Typography>

        <form onSubmit={formik.handleSubmit} style={{ marginTop: "3rem" }} noValidate>
          <TextField
            color="primary"
            fullWidth
            label="Name"
            style={{ marginBottom: "1.5rem" }}
            variant="filled"
            name="name"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
            error={!!formik.errors.name}
            helperText={formik.errors.name ? formik.errors.name : ""}
          />
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
            label="Password"
            variant="filled"
            name="password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
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
              "Signup"
            )}
          </Button>
          <Link
            style={{ display: "block", color: "black", marginTop: "1rem" }}
            to="/signin"
          >
            Already have an account?
          </Link>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
