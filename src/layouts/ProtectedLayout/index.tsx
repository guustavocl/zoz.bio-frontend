import { useAuth } from "../../context/AuthProvider/useAuth"

export const ProtectedLayout = ({children}: {children: JSX.Element }) => {
  const auth = useAuth();

  if(!auth || !auth.username) {
    return <h1>not auth bro!</h1>;
  }

  return children;
}