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
  completedTodos: ResponseTodoType[];
  isFetchingCompletedTodos: boolean;
  deleteTodoHandler: (id: string) => void;
  isDeleting: boolean;
  selectedTodoId: string;
  isMarkingAsCompleted: boolean;
  markAsCompletedHandler: (id: string) => void;
};

function CompletedTodos(props: PropsType) {
  const {
    completedTodos,
    isFetchingCompletedTodos,
    deleteTodoHandler,
    isDeleting,
    selectedTodoId,
    isMarkingAsCompleted,
    markAsCompletedHandler,
  } = props;

  return (
    <section>
      <Container style={{ paddingBottom: "2rem" }}>
        {isFetchingCompletedTodos ? (
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={50} color="secondary" />
          </Box>
        ) : completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
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
            You don't have completed todos! 🥱
          </Typography>
        )}
      </Container>
    </section>
  );
}

export default CompletedTodos;
