import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogInOutButton from "../auth/LogInOutButton";
import { useAppDispatch } from "../state/hooks";
import { addToken } from "../state/reducers/tokenReducer";
import { useNavigate } from "react-router-dom";

export default function AppBarTop() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
          },
        });
        dispatch(addToken(token));
      } catch (e) {
        // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
        console.error(e);
      }
    })();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {navigate('/')}}>
            {"TODOs"}
          </Typography>
          <LogInOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
