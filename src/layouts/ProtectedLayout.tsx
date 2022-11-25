import { useAuth } from "../context/AuthProvider/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth || !auth.email || !auth.token) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      {/* <Header auth={auth} />
      <div className="h-full mb-4 w-full flex flex-row items-center justify-center">
        <div className="h-full w-full lg:max-w-7xl justify-between items-center md:mb-16"> */}
      {children}
      {/* </div>
      </div>
      <Footer /> */}
    </>
  );
};

export default ProtectedLayout;
