import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { constStrings } from "../utils/constants";
import Page from "./Page";
import * as yup from "yup";
import { Tasks } from "../apicalls/requests";

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
    textAlign: "center",
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
    dateError: {
      color: "#32e0c4",
    },
  },
});

const validationSchema = yup.object({
  title: yup.string("enter title").required("title is required"),
  startDate: yup.date(),
  startTime: yup.date().nullable(),
  hours: yup.number().nullable().min(0).max(12),
  minutes: yup.number().nullable().min(0).max(59),
});

function AddTaskPage() {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: new Date(),
      startTime: null,
      hours: "0",
      minutes: "0",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newTask = {
        title: values.title,
        description: values.description,
        completed: false,
        startDate: new Date(values.startDate.setHours(0, 0, 0, 0)),
        hasStartTime: false,
        endDate: null,
      };

      if (values.startTime) {
        newTask.startDate.setHours(
          values.startTime.getHours(),
          values.startTime.getMinutes(),
          0,
          0
        );
        newTask.hasStartTime = true;
      }

      if (
        newTask.hasStartTime &&
        (values.hours !== "0" || values.minutes !== "0")
      ) {
        newTask.endDate = new Date(
          newTask.startDate.getTime() +
            parseInt(values.hours) * 60 * 60 * 1000 +
            parseInt(values.minutes) * 60 * 1000
        );
      }

      Tasks.addTask(newTask);

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

        <Grid container spacing={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              item
              xs={12}
              sm={4}
              className={classes.dateTimePickerGridItem}
            >
              <ThemeProvider theme={theme}>
                <DatePicker
                  fullWidth
                  id="startDate"
                  name="startDate"
                  label="start date"
                  value={formik.values.startDate}
                  minDate={new Date()}
                  onChange={(date) =>
                    formik.setFieldValue("startDate", date, false)
                  }
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                />
              </ThemeProvider>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              className={classes.dateTimePickerGridItem}
            >
              <ThemeProvider theme={theme}>
                <TimePicker
                  fullWidth
                  id="startTime"
                  name="startTime"
                  label="start time"
                  ampm={false}
                  value={formik.values.startTime}
                  onChange={(time) =>
                    formik.setFieldValue("startTime", time, false)
                  }
                  error={
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                  }
                />
              </ThemeProvider>
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid item xs={6} sm={2} className={classes.dateTimePickerGridItem}>
            <TextField
              id="hours"
              name="hours"
              label="hours"
              type="number"
              value={formik.values.hours}
              onChange={formik.handleChange}
              error={formik.touched.hours && Boolean(formik.errors.hours)}
            />
          </Grid>

          <Grid item xs={6} sm={2} className={classes.dateTimePickerGridItem}>
            <TextField
              id="minutes"
              name="minutes"
              label="minutes"
              type="minutes"
              value={formik.values.minutes}
              onChange={formik.handleChange}
              error={formik.touched.minutes && Boolean(formik.errors.minutes)}
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth className={classes.submitButton}>
          submit
        </Button>
      </form>
    </Page>
  );
}

export default AddTaskPage;
