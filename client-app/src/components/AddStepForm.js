import { Button, InputBase, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  input: {
    padding: theme.spacing(0.5),
    background: "#f0f0f0",
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

function AddStepForm() {
  const classes = useStyles();

  const [step, setStep] = useState("");

  const handleAddStepSubmit = (e) => {
    e.preventDefault();
    if (step !== "") {
      console.log("STEP: " + step);
      setStep("");
    }
  };

  const handleAddStepInputChange = (e) => {
    let stepText = e.target.value;
    setStep(stepText);
  };

  return (
    <form onSubmit={handleAddStepSubmit} className={classes.form}>
      <InputBase
        value={step}
        onChange={handleAddStepInputChange}
        fullWidth
        placeholder="add step"
        className={classes.input}
      />
      <Button fullWidth type="submit" className={classes.button}>
        add
      </Button>
    </form>
  );
}

export default AddStepForm;
