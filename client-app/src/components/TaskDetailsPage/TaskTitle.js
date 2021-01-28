import { Button, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Tasks } from "../../apicalls/requests";

const validationSchema = yup.object({
  newTitle: yup.string("enter title").required("title is required"),
});

function TaskTitle({ isAuthor, taskId, taskTitle }) {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(taskTitle);

  const changeTitleEditState = () => {
    if (isAuthor) {
      const e = !editTitle;
      setEditTitle(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      newTitle: title,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Tasks.patch(taskId, [
        {
          op: "replace",
          path: "/Title",
          value: values.newTitle,
        },
      ]);
      setTitle(values.newTitle);
      changeTitleEditState();
    },
  });

  return (
    <div>
      {editTitle ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="newTitle"
            name="newTitle"
            label="set new title"
            variant="outlined"
            value={formik.values.newTitle}
            onChange={formik.handleChange}
            error={formik.touched.newTitle && Boolean(formik.errors.newTitle)}
          />
          <Button type="submit" color="secondary">
            save
          </Button>
          <Button onClick={changeTitleEditState}>cancel</Button>
        </form>
      ) : (
        <Typography variant="h5" onClick={changeTitleEditState}>
          {title}
        </Typography>
      )}
    </div>
  );
}

export default TaskTitle;
