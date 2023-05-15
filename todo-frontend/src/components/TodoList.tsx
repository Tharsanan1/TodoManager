import { Button, Card, CardActions, CardContent, Checkbox, Dialog, Divider, FormControlLabel, FormGroup, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useGetTodosQuery, useUpdateTodoStatusMutation } from "../state/services/TodoServerAPI";
import { Todo, Status } from "../state/services/TodoServerAPI";
import AppBarTop from "./AppBar";
import { useEffect, useState } from "react";
import DateRangePickerComponent from "./DateRangePicker";
import { ImageView } from "./ImageView";


export function TodoList() {
  const data = useGetTodosQuery(null);
  const [updateTodoStatus, { isLoading, error }] = useUpdateTodoStatusMutation();
  
  const [todos, setTodos] = useState(data.data);
  const [todoChecked, setTodoChecked] = useState(true);
  const [inProgressChecked, setinProgressChecked] = useState(true);
  const [dateRangeChecked, setDateRangeChecked] = useState(false);
  const [doneChecked, setDoneChecked] = useState(true);
  const [isDatePickerDialogOpen, setisDatePickerDialogOpen] = useState(false);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("");

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
  const handleDateRangeCheckBoxChange = (isChecked: boolean) => {
    setDateRangeChecked(isChecked);
    setisDatePickerDialogOpen(isChecked)
  }

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const handleViewImage = (todo: Todo) => {
    setImageUrl(todo.imageUrl);
    setImageDialogOpen(true);
  }

  const handleStatusChange = (
    taskName: string,
    status: Status
  ) => {
    updateTodoStatus({taskName, status})
  };

  useEffect(() => {
    if (data.data) {
      // console.log(todoChecked, inProgressChecked, doneChecked);

      let todoAfterDateFilter;
      if (dateRangeChecked) {
        todoAfterDateFilter = data.data.filter((todo: Todo) => {
          const createdTimeStamp = Date.parse(todo.created_at);
          const createdDateTodo = new Date(createdTimeStamp);
          const createdWithoutTime = new Date(
            createdDateTodo.getFullYear(),
            createdDateTodo.getMonth(),
            createdDateTodo.getDate()
          );
          const startDateWithoutTime = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          );
          const endDateWithoutTime = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
          );
          console.log(
            startDate,
            createdDateTodo,
            endDate,
            startDate <= createdDateTodo,
            createdDateTodo <= endDate
          );
          if (
            startDateWithoutTime <= createdWithoutTime &&
            createdWithoutTime <= endDateWithoutTime
          ) {
            return true;
          }
          return false;
        });
      } else {
        todoAfterDateFilter = data.data;
      }
      const todosToShow = todoAfterDateFilter.filter((todo: Todo) => {
        if (todoChecked) {
          console.log(
            "ddfdsf",
            todo.status,
            Status.Todo,
            todo.status === Status.Todo
          );
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
        return false;
      });
      setTodos(todosToShow);
    }
  }, [
    todoChecked,
    inProgressChecked,
    doneChecked,
    data.data,
    dateRangeChecked,
    isDatePickerDialogOpen,
  ]);

  return (
    <div>
      <Dialog
        open={isDatePickerDialogOpen}
        onClose={() => {
          setisDatePickerDialogOpen(false);
        }}
      >
        <DateRangePickerComponent
          startDate={startDate}
          endDate={endDate}
          handleDateRangeChange={handleDateRangeChange}
        />
      </Dialog>
      <Dialog
        open={isImageDialogOpen}
        onClose={() => {
          setImageDialogOpen(false);
        }}
      >
        <ImageView imageUrl={imageUrl}></ImageView>
      </Dialog>
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
          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dateRangeChecked}
                    onChange={(event) => {
                      handleDateRangeCheckBoxChange(event.target.checked);
                    }}
                  />
                }
                label="Filter By Date"
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <FormGroup>
              <Button onClick={() => setisDatePickerDialogOpen(true)}>
                Update Date Filter
              </Button>
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
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    Created at: {item.created_at}
                  </Typography>
                  <div className="mt-10">
                    <ToggleButtonGroup
                      color="primary"
                      value={item.status}
                      exclusive
                      onChange={(event, value) => {
                        handleStatusChange(item.taskName, value)
                      }}
                      aria-label="Platform"
                    >
                      <ToggleButton value="Todo">TODO</ToggleButton>
                      <ToggleButton value="InProgress">
                        IN-PROGRESS
                      </ToggleButton>
                      <ToggleButton value="Done">DONE</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </CardContent>
                {item.imageUrl ? (
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleViewImage(item);
                      }}
                    >
                      View Image
                    </Button>
                  </CardActions>
                ) : (
                  <></>
                )}
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