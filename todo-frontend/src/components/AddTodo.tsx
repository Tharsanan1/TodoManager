import { TextField } from "@mui/material";
import AppBar from "./AppBar"
import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Input } from "@mui/material";
import { useCreateTodoMutation } from "../state/services/TodoServerAPI";
import { useNavigate } from "react-router-dom";

export function AddTodo() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [createTodo, { isSuccess }]  = useCreateTodoMutation();

  useEffect(() => {
    if (isSuccess) {
      alert("Success");
      navigate("/view-todo");
    }
  }, [isSuccess]);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("taskName", taskName);
      formData.append("taskDescription", taskDescription);
      createTodo(formData);
    }
  };

  const handleTaskNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskDescription(e.target.value);
  };


  return (
    <div>
      <AppBar />
      <div className="m-20">
        <TextField
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          fullWidth
          onChange={handleTaskNameChange}
        />
      </div>
      <div className="m-20">
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          fullWidth
          onChange={handleTaskDescriptionChange}
        />
      </div>
      <div className="m-20">
        <Input
          type="file"
          inputProps={{ accept: "image/*", }}
          onChange={handleFileChange}
        />
      </div>
      <div className="m-20">
        <Button variant="contained" color="success" onClick={handleUpload}>
          Create
        </Button>
      </div>
    </div>
  );
}