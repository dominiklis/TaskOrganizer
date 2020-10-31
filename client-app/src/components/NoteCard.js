import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

function NoteCard({ note }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle2">
          {`${note.Added.toLocaleDateString()} ${note.Added.toLocaleTimeString()}`}
        </Typography>
        <Typography variant="body1">{note.Text}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          edit
        </Button>
        <Button size="small" color="secondary">
          remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
