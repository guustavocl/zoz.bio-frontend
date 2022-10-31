import { useAuth } from "../context/AuthProvider/useAuth";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth || !auth.username) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Header />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
