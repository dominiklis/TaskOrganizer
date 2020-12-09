import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../apicalls/requests";

const validationSchema = yup.object({
  description: yup.string().nullable(),
});

function EditTaskDescriptionForm({
  description,
  id,
  afterSubmit,
  handleCancel,
  hideCancel,
}) {
  const formik = useFormik({
    initialValues: {
      description: description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Tasks.patch(id, [
        {
          op: "replace",
          path: "/Description",
          value: values.description,
        },
      ]);
      afterSubmit(values.description);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        multiline
        row={4}
        id="description"
        name="description"
        label="set new description"
        variant="outlined"
        value={formik.values.description}
        onChange={formik.handleChange}
      />

      <Button type="submit" color="primary">
        save
      </Button>
      {!hideCancel && (
        <Button color="secondary" onClick={handleCancel}>
          cancel
        </Button>
      )}
    </form>
  );
}

export default EditTaskDescriptionForm;
