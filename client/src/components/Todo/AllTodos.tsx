import React from "react";

import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";

import TodoCard from "./TodoCard";
import { ResponseTodoType } from "../../types/types";

type PropsType = {
  allTodos: ResponseTodoType[];
  isFetchingTodos: boolean;
  deleteTodoHandler: (id: string) => void;
  isDeleting: boolean;
  selectedTodoId: string;
  isMarkingAsCompleted: boolean;
  markAsCompletedHandler: (id: string) => void;
};

function AllTodos(props: PropsType) {
  const {
    allTodos,
    isFetchingTodos,
    deleteTodoHandler,
    isDeleting,
    selectedTodoId,
    isMarkingAsCompleted,
    markAsCompletedHandler,
  } = props;

  return (
    <section>
      <Container style={{ paddingBottom: "2rem" }}>
        {isFetchingTodos ? (
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={50} color="secondary" />
          </Box>
        ) : allTodos.length > 0 ? (
          allTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              title={todo.title}
              description={todo.description}
              isDeleting={isDeleting && selectedTodoId === todo._id}
              isMarkingAsCompleted={
                isMarkingAsCompleted && selectedTodoId === todo._id
              }
              deleteHandler={() => deleteTodoHandler(todo._id)}
              markAsCompletedHandler={() => markAsCompletedHandler(todo._id)}
              isCompleted={todo.isCompleted}
            />
          ))
        ) : (
          <Typography align="center" variant="h4" style={{ marginTop: "5rem" }}>
            You don't have anything to do! 😊
          </Typography>
        )}
      </Container>
    </section>
  );
}

export default AllTodos;
