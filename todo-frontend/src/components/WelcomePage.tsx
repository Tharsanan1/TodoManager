import { useAuth0 } from "@auth0/auth0-react";
import AppBar from './AppBar'
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <AppBar />
      {isAuthenticated ? (
        <div>
          <div className="text-center mt-20">
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.preventDefault();
                navigate("/view-todo");
              }}
            >
              Show My TODO list
            </Button>
          </div>
          <div className="text-center mt-20">
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.preventDefault();
                navigate("/add-todo");
              }}
            >
              Add new TODO
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <Typography variant="h6">
            Please login to use TODO management
          </Typography>
        </div>
      )}
    </div>
  );
}