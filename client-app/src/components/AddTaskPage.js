import { makeStyles } from "@material-ui/core";
import React from "react";
import Page from "./Page";

function AddTaskPage() {
  return (
    <Page>
      <form>
        <label>
          Description:
          <textarea /*value={this.state.value} onChange={this.handleChange}*/ />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    </Page>
  );
}

export default AddTaskPage;
