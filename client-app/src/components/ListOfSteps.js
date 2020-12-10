import { List } from "@material-ui/core";
import React from "react";
import ListOfStepsItem from "./ListOfStepsItem";

function ListOfSteps({ steps, handleDeleteStep }) {
  return (
    <List>
      {steps.map((step) => {
        return (
          <ListOfStepsItem
            step={step}
            key={step.id}
            handleDeleteStep={handleDeleteStep}
          />
        );
      })}
    </List>
  );
}

export default ListOfSteps;
