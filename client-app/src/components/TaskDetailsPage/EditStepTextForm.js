import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Steps } from "../../apicalls/requests";
import { Button, TextField } from "@material-ui/core";

const validationSchema = yup.object({
  text: yup.string("enter step text").required("text is required"),
});

function EditStepTextForm({ text, id, afterSubmit, handleCancel }) {
  const formik = useFormik({
    initialValues: {
      text: text,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Steps.patch(id, [
        {
          op: "replace",
          path: "/Text",
          value: values.text,
        },
      ]);

      afterSubmit(values.text);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="text"
        name="text"
        label="set new text"
        variant="outlined"
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && Boolean(formik.errors.text)}
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

export default EditStepTextForm;
