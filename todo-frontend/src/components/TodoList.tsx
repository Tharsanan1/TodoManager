import { Backdrop, Button, Card, CardActions, CardContent, Checkbox, Dialog, Divider, FormControlLabel, FormGroup, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useGetTodosQuery, useUpdateTodoStatusMutation } from "../state/services/TodoServerAPI";
import { Todo, Status } from "../state/services/TodoServerAPI";
import AppBarTop from "./AppBar";
import { useEffect, useState } from "react";
import DateRangePickerComponent from "./DateRangePicker";
import { ImageView } from "./ImageView";
import { useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";


const TodoList = function () {
  const [updateTodoStatus, { isLoading, error, isSuccess }] = useUpdateTodoStatusMutation();
  const token = useAppSelector((state) => {
    return state.token.token
  })
  const data = useGetTodosQuery(token);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTodos(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      data.refetch();
    }
  }, []);

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
    id: string,
    status: Status
  ) => {
    updateTodoStatus({id, status})
  };

  useEffect(() => {
    if (data.data) {
      let todoAfterDateFilter;
      if (dateRangeChecked) {
        todoAfterDateFilter = data.data.filter((todo: Todo) => {
          const createdTimeStamp = Date.parse(todo.createdAt);
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
          if (todo.status === Status.Todo) {
            return true;
          }
        }
        if (inProgressChecked) {
          if (todo.status === Status.InProgress) {
            return true;
          }
        }
        if (doneChecked) {
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      ></Backdrop>
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
          <br></br>
          <Grid item xs={12} sm={12} lg={12}>
            <FormGroup>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/add-todo")}
              >
                Add New Todo
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
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {item.createdAt}
                  </Typography>
                  <div className="mt-10">
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={item.status}
                      exclusive
                      onChange={(event, value) => {
                        handleStatusChange(item._id, value);
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

export default TodoList;