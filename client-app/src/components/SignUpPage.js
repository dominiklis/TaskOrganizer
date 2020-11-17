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

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
      history.push('/');
    },
  });

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h5" className={classes.signInHeader}>
        Create account and start using Task Orginer!
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
        />

        <TextField
          className={classes.inputField}
          fullWidth
          variant="outlined"
          label="repeat password"
          id="repeat-password"
          name="repeat-password"
          type="password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default SignUpPage;
