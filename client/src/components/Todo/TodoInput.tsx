import React from "react";

import {
  Paper,
  TextField,
  makeStyles,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { TodoType } from "../../types/types";
import { useMediaQuery } from "@material-ui/core";

type PropTypes = {
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodoHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  error: { titleError: boolean; descError: boolean };
  isTodoAdding: boolean;
  todo: TodoType;
};

function TodoInput(props: PropTypes) {
  const classes = useStyles();

  const isSmallScreen = useMediaQuery("(max-width:1160px)");

  const { inputChangeHandler, addTodoHandler, error, isTodoAdding, todo } =
    props;

  return (
    <Paper variant="outlined" className={classes.paper}>
      <form noValidate onSubmit={addTodoHandler}>
        <Box
          width="100%"
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          alignItems={isSmallScreen ? "flex-start" : "center"}
        >
          <Box width={isSmallScreen ? "100%" : "70%"}>
            <TextField
              label="Todo title"
              name="title"
              variant="outlined"
              onChange={inputChangeHandler}
              error={error.titleError}
              helperText={
                error.titleError ? "Can not be left empty, min words 8" : ""
              }
              value={todo.title}
              style={{ width: isSmallScreen ? "100%" : "" }}
            />
            <TextField
              style={{
                width: isSmallScreen ? "100%" : "70%",
                margin: isSmallScreen ? "16px 0" : "0 0 0 1rem",
              }}
              name="description"
              label="Description"
              variant="outlined"
              onChange={inputChangeHandler}
              error={error.descError}
              helperText={
                error.descError ? "Can not be left empty, min words 16" : ""
              }
              value={todo.description}
            />
          </Box>
          <Box
            width={isSmallScreen ? "100%" : "30%"}
            display="flex"
            justifyContent={isSmallScreen ? "flex-start" : "center"}
          >
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ width: isSmallScreen ? "8rem" : "6.5625rem" }}
              disabled={isTodoAdding}
            >
              {isTodoAdding ? <CircularProgress size={20} /> : "Add Todo"}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}

export default TodoInput;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem 1rem",
    marginTop: "1rem",
  },
}));
