import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Steps } from "../apicalls/requests";
import EditStepTextForm from "./EditStepTextForm";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  cancelCompleted: {
    color: "red",
  },
  setCompleted: {
    color: "green",
  },
  completedStepText: {
    color: "gray",
  },
}));

function ListOfStepsItem({ step, handleDeleteStep }) {
  const classes = useStyles();

  const [stepText, setStepText] = useState(step.text);
  const [stepCompleted, setStepCompleted] = useState(step.completed);
  const [editText, setEditText] = useState(false);

  const changeTextEditState = () => {
    const e = !editText;
    setEditText(e);
  };

  const handleDeleteFormSubmit = (e) => {
    e.preventDefault();
    handleDeleteStep(step.id);
    Steps.delete(step.id);
  };

  const handleSaveEditTextButton = (text) => {
    setStepText(text);
    changeTextEditState();
  };

  const handleCompletedFormSubmit = (e) => {
    e.preventDefault();
    const c = !stepCompleted;
    setStepCompleted(c);
    Steps.patch(step.id, [
      {
        op: "replace",
        path: "/Completed",
        value: !step.completed,
      },
    ]);
  };

  return (
    <ListItem>
      <ListItemIcon>
        <form onSubmit={handleCompletedFormSubmit}>
          <IconButton edge="end" aria-label="delete" type="submit">
            {stepCompleted ? (
              <CheckBoxIcon className={classes.setCompleted} />
            ) : (
              <CheckBoxOutlineBlankIcon className={classes.cancelCompleted} />
            )}
          </IconButton>
        </form>
      </ListItemIcon>
      {editText ? (
        <EditStepTextForm
          id={step.id}
          text={step.text}
          afterSubmit={handleSaveEditTextButton}
          handleCancel={changeTextEditState}
        />
      ) : (
        <ListItemText
          onClick={changeTextEditState}
          className={`${stepCompleted ? classes.completedStepText : ""}`}
        >
          {stepText}
        </ListItemText>
      )}
      <ListItemSecondaryAction>
        <form onSubmit={handleDeleteFormSubmit}>
          <IconButton edge="end" aria-label="delete" type="submit">
            <DeleteIcon />
          </IconButton>
        </form>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ListOfStepsItem;
