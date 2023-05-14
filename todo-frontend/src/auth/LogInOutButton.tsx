import { MouseEventHandler } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from "@mui/material/Button";

function LogInOutButton() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    loginWithRedirect();
  };

  return isAuthenticated ? (
    <Button variant="contained" color="success" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button variant="contained" color="success" onClick={handleLogin}>
      Login
    </Button>
  );
}

export default LogInOutButton
