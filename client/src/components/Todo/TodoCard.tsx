import React from "react";

import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";

type PropTypes = {
  isDeleting: boolean;
  isMarkingAsCompleted: boolean;
  title: string;
  description: string;
  deleteHandler: () => void;
  markAsCompletedHandler: () => void;
  isCompleted: boolean;
};

function TodoCard(props: PropTypes) {
  const {
    isDeleting,
    isMarkingAsCompleted,
    title,
    description,
    isCompleted,
    deleteHandler,
    markAsCompletedHandler,
  } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box>
        <Typography
          variant="h5"
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {description}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <Box mr="1rem">
          {isMarkingAsCompleted ? (
            <CircularProgress size={20} />
          ) : isCompleted ? (
            <Tooltip title="Undo">
              <IconButton onClick={markAsCompletedHandler} aria-label="undo">
                <UndoIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Mark as completed">
              <IconButton
                onClick={markAsCompletedHandler}
                aria-label="complete"
              >
                <DoneIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {isDeleting ? (
          <CircularProgress size={20} />
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={deleteHandler} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
}

export default TodoCard;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem 1rem",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& p": {
      marginTop: "10px",
    },
  },
}));
