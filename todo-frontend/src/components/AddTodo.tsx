import { Backdrop, TextField } from "@mui/material";
import AppBar from "./AppBar"
import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Input } from "@mui/material";
import { useCreateTodoMutation } from "../state/services/TodoServerAPI";
import { useNavigate } from "react-router-dom";

export function AddTodo() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createTodo, { isSuccess, isLoading }]  = useCreateTodoMutation();

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
      formData.append("name", name);
      formData.append("description", description);
      createTodo(formData);
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      createTodo(formData);
    }
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDescription(e.target.value);
  };


  return (
    <div>
      <AppBar />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
      </Backdrop>
      <div className="m-20">
        <TextField
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          fullWidth
          onChange={handleNameChange}
        />
      </div>
      <div className="m-20">
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          fullWidth
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="m-20">
        <Input
          type="file"
          inputProps={{ accept: "image/*" }}
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