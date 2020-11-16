import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  createMuiTheme,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { constStrings } from "../data/constants";
import Page from "./Page";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
    background: "#0d7377",
    color: "white",
    "&:hover": {
      background: "#32e0c4",
    },
  },
  textField: {
    marginTop: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d7377",
      contrastText: "#fff",
    },
    secondary: {
      main: "#32e0c4",
      contrastText: "#fff",
    },
  },
});

function AddTaskPage() {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      history.push('/');
    },
  });

  return (
    <Page>
      <Typography variant="h6">{constStrings.addNewTask}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="title"
          className={classes.textField}
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          multiline
          row={4}
          id="description"
          name="description"
          label="description"
          className={classes.textField}
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box display="flex">
            <Box flexGrow={1} textAlign="center">
              <ThemeProvider theme={theme}>
                <DateTimePicker
                  id="startDate"
                  name="startDate"
                  label="start date"
                  value={formik.values.startDate}
                  onChange={(date) =>
                    formik.setFieldValue("startDate", date, false)
                  }
                />
              </ThemeProvider>
            </Box>

            <Box flexGrow={1} textAlign="center">
              <ThemeProvider theme={theme}>
                <DateTimePicker
                  id="endDate"
                  name="endDate"
                  label="end date"
                  value={formik.values.endDate}
                  onChange={(date) =>
                    formik.setFieldValue("endDate", date, false)
                  }
                />
              </ThemeProvider>
            </Box>
          </Box>
        </MuiPickersUtilsProvider>

        <Button type="submit" fullWidth className={classes.submitButton}>
          submit
        </Button>
      </form>
    </Page>
  );
}

export default AddTaskPage;
