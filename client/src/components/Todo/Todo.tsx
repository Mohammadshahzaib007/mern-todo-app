import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch, useHistory } from "react-router";
import { Container, Typography } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import AllTodos from "./AllTodos";
import CompletedTodos from "./CompletedTodos";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import {
  AllTodoResponseType,
  TodoType,
  ResponseTodoType,
} from "../../types/types";
import { axios } from "../../http/http";

type PropsType = {
  isAuth: boolean;
};

function Todo(props: PropsType) {
  const { addToast } = useToasts();
  const history = useHistory();

  const { isAuth } = props;

  const [todo, setTodo] = useState<TodoType>({
    title: "",
    description: "",
    isCompleted: false,
  });

  const [allTodos, setAllTodos] = useState<ResponseTodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<ResponseTodoType[]>([]);

  const [isFetchingTodos, setIsFetchingTodos] = useState(false);
  const [isTodoAdding, setIsTodoAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string>("");
  const [isFetchingCompletedTodos, setIsFetchingCompletedTodos] =
    useState(false);

  const [error, setError] = useState({
    titleError: false,
    descError: false,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({ titleError: false, descError: false });
    setTodo({
      ...todo,
      [event.target.name]: event.target.value,
      isCompleted: false,
    });
  };

  const addTodoToTheDb = async () => {
    try {
      setIsTodoAdding(true);
      const { data } = await axios.post("/todo/create_todo", todo);
      addToast("Todo added Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setTodo({
        title: "",
        description: "",
        isCompleted: false,
      });

      fetchAllTodos();
      fetchCompletedTodos();
    } catch (err) {
      console.log(err);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsTodoAdding(false);
    }
  };

  const addTodoHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todo.title === "" || todo.title.length <= 8) {
      setError((prevState) => {
        return { ...prevState, titleError: true };
      });
    }
    if (todo.description === "" || todo.description.length <= 16) {
      setError((prevState) => {
        return { ...prevState, descError: true };
      });
    }

    if (
      todo.title === "" ||
      todo.description === "" ||
      todo.title.length < 8 ||
      todo.description.length < 16
    ) {
      return;
    }

    addTodoToTheDb();
  };

  // delete todo handler
  const deleteTodoHandler = async (id: string) => {
    setSelectedTodoId(id);
    try {
      setIsDeleting(true);
      const { data } = await axios.delete(`/todo/${id}`);
      console.log(data);
      addToast("Todo deleted Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      fetchAllTodos();
      fetchCompletedTodos();
    } catch (err) {
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // mark as completed todo handler
  const markAsCompletedHandler = async (id: string) => {
    setSelectedTodoId(id);
    try {
      setIsMarkingAsCompleted(true);
      const { data } = await axios.put(`/todo/${id}`);
      console.log(data);
      fetchAllTodos();
      fetchCompletedTodos();
      addToast("Todo updated Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.log(error);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsMarkingAsCompleted(false);
    }
  };

  // fetching all the todos
  const fetchAllTodos = async () => {
    try {
      setIsFetchingTodos(true);
      const { data } = await axios.get<AllTodoResponseType>("/todo/all_todos");
      setAllTodos(data.todos);
    } catch (error) {
      console.log(error);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsFetchingTodos(false);
    }
  };

  // fetching completed todos
  const fetchCompletedTodos = async () => {
    try {
      setIsFetchingCompletedTodos(true);
      const { data } = await axios.get<AllTodoResponseType>(
        "/todo/completed_todos"
      );
      setCompletedTodos(data.todos);
    } catch (error) {
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
      console.log(error);
    } finally {
      setIsFetchingCompletedTodos(false);
    }
  };

  useEffect(() => {
    fetchAllTodos();
    fetchCompletedTodos();
  }, []);

  return (
    <section style={{ height: "calc(100vh - 124px)" }}>
      <Container>
        <TodoInput
          todo={todo}
          inputChangeHandler={inputChangeHandler}
          addTodoHandler={addTodoHandler}
          error={error}
          isTodoAdding={isTodoAdding}
        />

        <TodoHeader />

        <main>
          <Switch>
            <Route
              path="/all-todos"
              render={(props) => (
                <AllTodos
                  {...props}
                  allTodos={allTodos}
                  isFetchingTodos={isFetchingTodos}
                  deleteTodoHandler={deleteTodoHandler}
                  isDeleting={isDeleting}
                  selectedTodoId={selectedTodoId}
                  isMarkingAsCompleted={isMarkingAsCompleted}
                  markAsCompletedHandler={markAsCompletedHandler}
                />
              )}
            />
            <Route
              path="/completed"
              render={(props) => (
                <CompletedTodos
                  {...props}
                  completedTodos={completedTodos}
                  isFetchingCompletedTodos={isFetchingCompletedTodos}
                  deleteTodoHandler={deleteTodoHandler}
                  isDeleting={isDeleting}
                  selectedTodoId={selectedTodoId}
                  isMarkingAsCompleted={isMarkingAsCompleted}
                  markAsCompletedHandler={markAsCompletedHandler}
                />
              )}
            />

            <Route
              render={() => (
                <Typography variant="h4" align="center">
                  Page Not Found! 🤔
                </Typography>
              )}
            />
          </Switch>
        </main>
      </Container>
    </section>
  );
}

export default Todo;
