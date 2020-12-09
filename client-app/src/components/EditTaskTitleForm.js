import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../apicalls/requests";

const validationSchema = yup.object({
  title: yup.string("enter title").required("title is required"),
});

function EditTaskTitleForm({ title, id, afterSubmit, handleCancel }) {
  const formik = useFormik({
    initialValues: {
      title: title,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Tasks.patch(id, [
        {
          op: "replace",
          path: "/Title",
          value: values.title,
        },
      ]);
      afterSubmit(values.title);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="set new title"
        variant="outlined"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
      />
      <Button type="submit" color="primary">
        save
      </Button>
      <Button color="secondary" onClick={handleCancel}>
        cancel
      </Button>
    </form>
  );
}

export default EditTaskTitleForm;
