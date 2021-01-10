import {
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../apicalls/requests";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  startDate: yup.date(),
  startTime: yup.date().nullable(),
  hours: yup.number().nullable().min(0).max(24),
  minutes: yup.number().nullable().min(0).max(59),
});

function EditTaskDates({ task, afterSubmit, handleCancel }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      startDate: new Date(task.startDate),
      startTime: task.hasStartTime ? new Date(task.startDate) : null,
      hours: task.endDate
        ? Math.round(
            parseInt(
              Math.abs(new Date(task.startDate) - new Date(task.endDate)) /
                (1000 * 60 * 60)
            )
          )
        : "0",
      minutes: task.endDate
        ? Math.round(
            ((Math.abs(new Date(task.startDate) - new Date(task.endDate)) /
              (1000 * 60 * 60)) %
              1) *
              60
          )
        : "0",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedTask = {
        title: task.title,
        description: task.description,
        completed: task.completed,
        hasStartTime: task.hasStartTime,
        startDate: task.startDate,
        endDate: task.endDate,
        tags: task.tags,
      };

      updatedTask.startDate = new Date(values.startDate.setHours(0, 0, 0, 0));
      updatedTask.hasStartTime = false;
      updatedTask.endDate = null;

      if (values.startTime) {
        updatedTask.startDate.setHours(
          values.startTime.getHours(),
          values.startTime.getMinutes(),
          0,
          0
        );
        updatedTask.hasStartTime = true;
      }

      if (
        updatedTask.hasStartTime &&
        (values.hours !== "0" || values.minutes !== "0")
      ) {
        updatedTask.endDate = new Date(
          updatedTask.startDate.getTime() +
            parseInt(values.hours) * 60 * 60 * 1000 +
            parseInt(values.minutes) * 60 * 1000
        );
      }

      if (
        (values.hours === "0" && values.minutes === "0") ||
        (values.hours === 0 && values.minutes === "0") ||
        (values.hours === "0" && values.minutes === 0) ||
        (values.hours === 0 && values.minutes === 0)
      ) {
        updatedTask.endDate = null;
      }

      Tasks.put(task.id, updatedTask);

      afterSubmit(
        updatedTask.startDate,
        updatedTask.hasStartTime,
        updatedTask.endDate
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12} sm={4} className={classes.dateTimePickerGridItem}>
            <ThemeProvider theme={theme}>
              <DatePicker
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

          <Grid item xs={12} sm={4} className={classes.dateTimePickerGridItem}>
            <ThemeProvider theme={theme}>
              <TimePicker
                fullWidth
                id="startTime"
                name="startTime"
                label="start time"
                ampm={false}
                value={formik.values.startTime}
                minutesStep={5}
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
            type="number"
            value={formik.values.minutes}
            onChange={formik.handleChange}
            error={formik.touched.minutes && Boolean(formik.errors.minutes)}
          />
        </Grid>
      </Grid>

      <Button type="submit" color="primary">
        save
      </Button>
      <Button color="secondary" onClick={handleCancel}>
        cancel
      </Button>
    </form>
  );
}

export default EditTaskDates;
