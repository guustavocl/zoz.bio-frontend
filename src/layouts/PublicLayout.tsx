import { useAuth } from "../context/AuthProvider/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PublicLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  return (
    <>
      <Header auth={auth} />
      <div className="h-full mb-4 w-full flex flex-row items-center justify-center">
        <div className="h-full w-full lg:max-w-7xl justify-between items-center md:mb-16">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
