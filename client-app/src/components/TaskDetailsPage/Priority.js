import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import { Tasks } from "../../apicalls/requests";
import { getPriorityText } from "../../utils/constants";

function Priority({ isAuthor, taskId, taskPriority }) {
  const [editPriority, setEditPriority] = useState(false);
  const [priority, setPriority] = useState(taskPriority);

  const changePriorityEditState = () => {
    if (isAuthor) {
      const e = !editPriority;
      setEditPriority(e);
    }
  };

  const handleChange = (event) => {
    setPriority(parseInt(event.target.value));
  };

  const getPriorityTextColor = (priority) => {
    if (priority === 0) {
      return "textSecondary";
    } else if (priority === 1) {
      return "primary";
    }
    return "secondary";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Tasks.patch(taskId, [
      {
        op: "replace",
        path: "/Priority",
        value: priority.toString(),
      },
    ]);

    changePriorityEditState();
  };

  return (
    <Fragment>
      {editPriority ? (
        <form onSubmit={handleSubmit}>
          <RadioGroup
            row
            aria-label="priority"
            name="priority"
            defaultValue={priority.toString()}
            onChange={handleChange}
          >
            <FormControlLabel
              value="0"
              control={<Radio color="primary" />}
              label="normal"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="high"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="very high"
              labelPlacement="bottom"
            />
          </RadioGroup>
          <Button color="secondary" type="submit">
            save
          </Button>
          <Button onClick={changePriorityEditState}>cancel</Button>
        </form>
      ) : (
        <Typography
          variant="h6"
          onClick={changePriorityEditState}
          color={getPriorityTextColor(priority)}
        >
          {getPriorityText(priority)}
        </Typography>
      )}
    </Fragment>
  );
}

export default Priority;
