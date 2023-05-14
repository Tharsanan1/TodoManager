import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import { useGetTodosQuery } from "../state/services/TodoServerAPI";
import { Todo, Status } from "../state/services/TodoServerAPI";
import AppBarTop from "./AppBar";
import { useEffect, useState } from "react";


export function TodoList() {
  const data = useGetTodosQuery(null);
  const [todos, setTodos] = useState(data.data);
  const [todoChecked, setTodoChecked] = useState(false);
  const [inProgressChecked, setinProgressChecked] = useState(false);
  const [doneChecked, setDoneChecked] = useState(false);
  useEffect(() => {
    if (data) {
      setTodos(data.data);
    }
  }, [data]);

  const handleTodoCheckBoxChange = (isChecked: boolean) => {
    setTodoChecked(isChecked);
  }
  const handleInprogressCheckBoxChange = (isChecked: boolean) => {
    setinProgressChecked(isChecked);
  };
  const handleDoneCheckBoxChange = (isChecked: boolean) => {
    setDoneChecked(isChecked);
  };

  useEffect(() => {
    if (data.data) {
      // console.log(todoChecked, inProgressChecked, doneChecked);
      const todosToShow = data.data.filter((todo: Todo) => { 
        // console.log(todo.status);
        if (todoChecked) {
          console.log("ddfdsf", todo.status, Status.Todo,  todo.status === Status.Todo);
          if (todo.status === Status.Todo) {
            console.log(todo.status);
            return true;
          }
        }
        if (inProgressChecked) {
          console.log(
            "ddfdsf",
            todo.status,
            Status.InProgress,
            todo.status === Status.InProgress
          );
          if (todo.status === Status.InProgress) {
            return true;
          }
        }
        if (doneChecked) {
          console.log(
            "ddfdsf",
            todo.status,
            Status.Done,
            todo.status === Status.Done
          );
          if (todo.status === Status.Done) {
            return true;
          }
        }
        if (!todoChecked && !inProgressChecked && !doneChecked) {
          return true;
        }
        return false;
      });
      setTodos(todosToShow);
    }
  }, [todoChecked, inProgressChecked, doneChecked, data.data]);

  return (
    <div>
      <AppBarTop />
      <div className="m-20">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todoChecked}
                    onChange={(event) => {
                      handleTodoCheckBoxChange(event.target.checked);
                    }}
                  />
                }
                label="Todo"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inProgressChecked}
                    onChange={(event) => {
                      handleInprogressCheckBoxChange(event.target.checked);
                    }}
                  />
                }
                label="In-progress"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={doneChecked}
                    onChange={(event) => {
                      handleDoneCheckBoxChange(event.target.checked);
                    }}
                  />
                }
                label="Done"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </div>
      {data.isSuccess && todos ? (
        <div>
          {todos.map((item: Todo, index: number) => (
            <div className="mt-20" key={index}>
              <Card sx={{ minWidth: 275 }} raised={true}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {item.taskName}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {item.taskDescription}
                  </Typography>
                  <div>Status: {item.status}</div>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}