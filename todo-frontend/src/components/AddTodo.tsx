import { TextField } from "@mui/material";
import AppBar from "./AppBar"
import React, { useState, ChangeEvent } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";

export function AddTodo() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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
      try {
        const response = await axios.post("/api/upload", formData);
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
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
        <Input type="file" onChange={handleFileChange} />
      </div>
      <div className="m-20">
        <Button variant="contained" color="success" onClick={handleUpload}>
          Create
        </Button>
      </div>
    </div>
  );
}