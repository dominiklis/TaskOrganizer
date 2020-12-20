import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backgroundContainer: {
    background: "#0d7377",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  signInHeader: {
    color: "#0d7377",
  },
  inputField: {
    background: "#f0f0f0",
    marginTop: theme.spacing(2),
  },
  submitButton: {
    background: "#0d7377",
    color: "#fff",
    marginTop: theme.spacing(2),
    "&:hover": {
      background: "#32e0c4",
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("enter your email")
    .email("enter a valid email")
    .required("email is required"),
  password: yup
    .string("enter your password")
    .min(6, "password should be of minimum 6 characters")
    .required("password is required"),
});

function SignInPage() {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      history.push("/");
    },
  });

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h5" className={classes.signInHeader}>
        Sign in to Task Organizer
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.inputField}
          fullWidth
          variant="outlined"
          label="email address"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className={classes.inputField}
          fullWidth
          variant="outlined"
          label="password"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submitButton}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default SignInPage;
