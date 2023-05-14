import {
  Auth0Provider,
  Auth0ProviderOptions,
  AppState,
} from '@auth0/auth0-react'

import { useNavigate } from 'react-router-dom'

interface Auth0ProviderWithHistoryProps {
  children: React.ReactNode
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({children}) => {
  const domain = process.env.REACT_APP_AUTH_DOMAIN || "";
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID || "";
  const authorizationParams = {
    redirect_uri: window.location.origin
  }
  const navigate = useNavigate()
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  const auth0ProviderProps: Auth0ProviderOptions = {
    domain,
    clientId,
    authorizationParams,
    onRedirectCallback ,
  }

  return <Auth0Provider {...auth0ProviderProps}>{children}</Auth0Provider>
}

export default Auth0ProviderWithHistory
