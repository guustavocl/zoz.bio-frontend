import Header from "../components/Header";
import Footer from "../components/Footer";
import Component404 from "../components/404";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import pageService from "../services/page.service";
import UserPage from "../pages/UserPage";
import { useToasts } from "../context/ToastProvider/useToasts";

export const PageLayout = () => {
  const { errorToast } = useToasts();
  const pathname = window.location.pathname.split("/");
  let pagename = "";
  if (pathname && pathname[1]) pagename = pathname[1];

  const queryPage = useQuery({
    queryKey: ["userPage"],
    queryFn: () => pageService.getPage(pagename),
  });

  if (queryPage.isError) {
    const error = queryPage.error as Error;
    errorToast(error.message);
  }

  if (queryPage.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      {queryPage.data?.page ? (
        <div className="min-h-screen w-full flex flex-col items-center">
          <UserPage page={queryPage.data.page} />
        </div>
      ) : (
        <>
          <Header />
          <Component404 />
          <Footer />
        </>
      )}
    </>
  );
};
