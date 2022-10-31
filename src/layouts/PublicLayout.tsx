import Footer from "../components/Footer";
import Header from "../components/Header";

export const PublicLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
