import { Button, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Steps } from "../apicalls/requests";

const useStyles = makeStyles((theme) => ({
  form: {
    background: "#f0f0f0",
    marginTop: theme.spacing(1),
  },
  input: {},
  button: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

function AddStepForm({ taskId, onAddStep }) {
  const classes = useStyles();

  const validationSchema = yup.object({
    text: yup.string("enter step text").required("text is required"),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const newStep = {
        task: taskId,
        text: values.text,
      };

      Steps.add(newStep).then((response) => onAddStep(response.data));

      actions.resetForm({
        values: {
          text: "",
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div>
        <TextField
          fullWidth
          id="text"
          name="text"
          label="text"
          className={classes.input}
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder="add step"
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
      </div>

      <Button fullWidth type="submit" className={classes.button}>
        add
      </Button>
    </form>
  );
}

export default AddStepForm;
