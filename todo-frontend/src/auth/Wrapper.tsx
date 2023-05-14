import React, {ReactNode} from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface WrapperProps {
  children: ReactNode
}


function Wrapper({ children }: WrapperProps) {
  const { isLoading, error } = useAuth0()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  return <>{children}</>
}
export default Wrapper
