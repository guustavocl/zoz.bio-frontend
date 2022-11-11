import { useAuth } from "../context/AuthProvider/useAuth";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Layout.css";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth || !auth.email || !auth.token) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Header auth={auth} />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
