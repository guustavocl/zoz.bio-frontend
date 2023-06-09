import React from "react";
import { ToastContainer } from "react-toastify";
import { PageProps } from "@/types/PageProps";
import BioMain from "../[username]/BioMain";

export const BioComponent = ({ page }: { page: PageProps }) => {
  return (
    <>
      {page ? (
        <div className="flex min-h-screen w-full flex-col items-center overflow-hidden">
          <BioMain page={page} />
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
