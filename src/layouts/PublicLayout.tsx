import { useAuth } from "../context/AuthProvider/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LazyLoadImage } from "../components/Loading";

const PublicLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  return (
    <>
      <LazyLoadImage />
      <div className="h-full w-full flex flex-col items-center">
        <Header auth={auth} />
        <div className="h-full">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
