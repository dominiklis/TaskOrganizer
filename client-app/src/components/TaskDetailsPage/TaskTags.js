import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import TagChip from "../TagChip";
import { useFormik } from "formik";
import * as yup from "yup";
import { Tasks } from "../../apicalls/requests";

const validationSchema = yup.object({
  newTags: yup.string().nullable(),
});

function TaskTags({ isAuthor, taskId, taskTags }) {
  const [editTags, setEditTags] = useState(false);
  const [tags, setTags] = useState(taskTags);

  const changeEditTagsState = () => {
    if (isAuthor) {
      const edit = !editTags;
      setEditTags(edit);
    }
  };

  const formik = useFormik({
    initialValues: {
      newTags: tags.join([" "]),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedTask = {
        editTags: true,
        tags: [],
      };

      let ts = values.newTags.split(" ");
      ts.forEach((tag) => {
        tag = tag.replace(/\W/g, "");
        if (tag.length > 0) {
          updatedTask.tags.push(tag);
        }
      });

      Tasks.put(taskId, updatedTask);

      setTags(updatedTask.tags);
      changeEditTagsState();
    },
  });

  return (
    <Fragment>
      <Box display="flex">
        <Typography variant="subtitle1">tags:</Typography>
        {isAuthor && (
          <Tooltip title="edit tags">
            <IconButton
              aria-label="edit tags"
              size="small"
              onClick={changeEditTagsState}
            >
              {editTags ? <ClearIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {editTags ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            multiline
            row={4}
            id="newTags"
            name="newTags"
            label="separate tags with space"
            variant="outlined"
            value={formik.values.newTags}
            onChange={formik.handleChange}
          />

          <Button type="submit" color="primary">
            save
          </Button>

          <Button color="secondary" onClick={changeEditTagsState}>
            cancel
          </Button>
        </form>
      ) : (
        <Box display="flex" flexWrap="wrap">
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </Box>
      )}
    </Fragment>
  );
}

export default TaskTags;