import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Steps } from "../../apicalls/requests";
import EditStepTextForm from "./EditStepTextForm";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Fragment } from "react";

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

function ListOfStepsItem({ step, handleDeleteStep, canEdit }) {
  const classes = useStyles();

  const [stepText, setStepText] = useState(step.text);
  const [stepCompleted, setStepCompleted] = useState(step.completed);
  const [editText, setEditText] = useState(false);

  const changeTextEditState = () => {
    if (canEdit) {
      const e = !editText;
      setEditText(e);
    }
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
        {canEdit ? (
          <Tooltip
            title={stepCompleted ? "mark as incomplete" : "mark as completed"}
          >
            <form onSubmit={handleCompletedFormSubmit}>
              <IconButton edge="end" aria-label="delete" type="submit">
                {stepCompleted ? (
                  <CheckBoxIcon className={classes.setCompleted} />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    className={classes.cancelCompleted}
                  />
                )}
              </IconButton>
            </form>
          </Tooltip>
        ) : (
          <Fragment>
            {stepCompleted ? (
              <CheckBoxIcon className={classes.setCompleted} />
            ) : (
              <CheckBoxOutlineBlankIcon className={classes.cancelCompleted} />
            )}
          </Fragment>
        )}
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
        {canEdit && (
          <Tooltip title="delete step">
            <form onSubmit={handleDeleteFormSubmit}>
              <IconButton edge="end" aria-label="delete step" type="submit">
                <DeleteIcon />
              </IconButton>
            </form>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ListOfStepsItem;
