import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function User() {
  const { isAuthenticated, user } = useAuth0()
  console.log("isAuth", isAuthenticated);
  return isAuthenticated ? (
    <div>Hello {user ? user.name : <div>"Error!"</div>}</div>
  ) : null;
}

export default User
