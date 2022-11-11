import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthProvider/useAuth";
import "./Layout.css";

export const PublicLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  console.log(auth);

  return (
    <>
      <Header auth={auth} />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
