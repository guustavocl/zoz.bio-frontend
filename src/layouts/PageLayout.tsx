import { useQuery } from "@tanstack/react-query";
import { useToasts } from "../context/ToastProvider/useToasts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Zoz404 from "../components/404";
import pageService from "../services/page.service";
import LoadingPage from "../components/Loading";
import Page from "../pages/Page";

const PageLayout = () => {
  const { errorToast } = useToasts();
  const pathname = window.location.pathname.split("/");
  let pagename = "";
  if (pathname && pathname[1]) pagename = pathname[1];

  const queryPage = useQuery({
    queryKey: ["page"],
    queryFn: () => pageService.getPage(pagename),
  });

  if (queryPage.isError) {
    const error = queryPage.error as Error;
    errorToast(error.message);
  }

  if (queryPage.isLoading) {
    return <LoadingPage />;
  }

  if (queryPage.data?.page?.uname) {
    document.title = `zoz.gg - ${queryPage.data.page.uname}`;
  }

  return (
    <>
      {queryPage.data?.page ? (
        <div className="min-h-screen w-full flex flex-col items-center overflow-hidden">
          <Page page={queryPage.data.page} />
        </div>
      ) : (
        <>
          <Header />
          <Zoz404 />
          <Footer />
        </>
      )}
    </>
  );
};

export default PageLayout;
