import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { constStrings } from "../utils/constants";
import Page from "./Page";
import * as yup from "yup";

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
  dateTimePickerGridItem: {
    textAlign: "center"
  }
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
    dateError: {
      color: "#32e0c4",
    },
  },
});

const validationSchema = yup.object({
  title: yup.string("enter title").required("title is required"),
  startDate: yup.date(),
  endDate: yup
    .date()
    .nullable()
    .default(null)
    .when(
      "startDate",
      (sDate, yup) =>
        sDate && yup.min(sDate, "end date cannot be before start date")
    ),
});

function AddTaskPage() {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      history.push("/");
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
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
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

        {formik.touched.endDate && formik.errors.endDate && (
          <Box textAlign="center">
            <p style={{ color: "red" }}>end date cannot be before start date</p>
          </Box>
        )}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className={classes.dateTimePickerGridItem}>
              <ThemeProvider theme={theme}>
                <DateTimePicker
                fullWidth 
                  id="startDate"
                  name="startDate"
                  label="start date"
                  value={formik.values.startDate}
                  onChange={(date) =>
                    formik.setFieldValue("startDate", date, false)
                  }
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                />
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.dateTimePickerGridItem}>
              <ThemeProvider theme={theme}>
                <DateTimePicker
                fullWidth 
                  id="endDate"
                  name="endDate"
                  label="end date"
                  value={formik.values.endDate}
                  onChange={(date) =>
                    formik.setFieldValue("endDate", date, false)
                  }
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                />
              </ThemeProvider>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <Button type="submit" fullWidth className={classes.submitButton}>
          submit
        </Button>
      </form>
    </Page>
  );
}

export default AddTaskPage;
