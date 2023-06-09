"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/PageService";
import BioMain from "./BioMain";
import { ToastContainer } from "react-toastify";
import { errorToast } from "@/utils/toaster";

export const BioComponent = ({ username }: { username: string }) => {
  const queryPage = useQuery({
    queryKey: ["getPage"],
    queryFn: () => getPage(username),
  });

  if (queryPage.isError) {
    const error = queryPage.error as Error;
    console.log(error);
    errorToast(error.message);
  }

  if (queryPage.isLoading) {
    //TODO LOADING PAGE
    return <div>LOADING ....</div>;
  }

  return (
    <>
      {queryPage.data?.page ? (
        <div className="flex min-h-screen w-full flex-col items-center overflow-hidden">
          <BioMain page={queryPage.data.page} />
        </div>
      ) : (
        // TODO 404 page redirect to create a page?
        <>
          <div>404</div>
          {/* <Header />
          <Zoz404 />
          <Footer /> */}
        </>
      )}
      <ToastContainer />
    </>
  );
};
