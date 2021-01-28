import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../../apicalls/requests";

const validationSchema = yup.object({
  newDescription: yup.string().nullable(),
});

const useStyles = makeStyles((theme) => ({
  partName: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
}));

function TaskDescription({ isAuthor, taskId, taskDescription }) {
  const classes = useStyles();

  const [editDescription, setEditDescription] = useState(
    taskDescription === "" ? true : false
  );
  const [description, setDescription] = useState(taskDescription);

  const setDescriptionEditStateTrue = () => setEditDescription(true);
  const setDescriptionEditStateFalse = () => setEditDescription(false);

  const formik = useFormik({
    initialValues: {
      newDescription: description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Tasks.patch(taskId, [
        {
          op: "replace",
          path: "/Description",
          value: values.newDescription,
        },
      ]);
      setDescription(values.newDescription);
      setDescriptionEditStateFalse();
    },
  });

  return (
    <Fragment>
      <Typography variant="subtitle2" className={classes.partName}>
        description:
      </Typography>
      {(editDescription || description === "") && isAuthor ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            multiline
            row={4}
            id="newDescription"
            name="newDescription"
            label="set new description"
            variant="outlined"
            value={formik.values.newDescription}
            onChange={formik.handleChange}
          />

          <Button type="submit" color="secondary">
            save
          </Button>
          {description !== "" && (
            <Button onClick={setDescriptionEditStateFalse}>
              cancel
            </Button>
          )}
        </form>
      ) : (
        description.split(/\r?\n/).map((line, index) => (
          <Typography
            key={index}
            variant="body1"
            onClick={setDescriptionEditStateTrue}
          >
            {line}
          </Typography>
        ))
      )}
    </Fragment>
  );
}

export default TaskDescription;
