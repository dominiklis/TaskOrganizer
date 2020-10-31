import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function ListOfStepsItem({ step }) {
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={step.Completed}
          disableRipple
          style={{ color: "#0d7377" }}
        />
      </ListItemIcon>
      <ListItemText>{step.Text}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ListOfStepsItem;
