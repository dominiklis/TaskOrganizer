import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../apicalls/requests";

const validationSchema = yup.object({
  tags: yup.string().nullable(),
});

function EditTagsForm({ task, afterSubmit, handleCancel }) {
  const formik = useFormik({
    initialValues: {
      tags: task.tags.join([" "]),
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
        tags: [],
      };

      let ts = values.tags.split(" ");
      ts.forEach((tag) => {
        tag = tag.replace(/\W/g, "");
        if (tag.length > 0) {
          updatedTask.tags.push(tag);
        }
      });

      Tasks.put(task.id, updatedTask);

      afterSubmit(updatedTask.tags);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        multiline
        row={4}
        id="tags"
        name="tags"
        label="separate tags with space"
        variant="outlined"
        value={formik.values.tags}
        onChange={formik.handleChange}
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

export default EditTagsForm;
