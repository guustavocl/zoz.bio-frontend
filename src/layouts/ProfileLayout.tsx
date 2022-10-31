import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Component404 from "../components/404";
import { useEffect, useState } from "react";

export const ProfileLayout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    console.log(pathname);
    if (pathname && pathname[1]) setUsername(pathname[1]);
  }, []);

  return (
    <>
      {username && username === "gustavo" ? (
        <h1>{username}</h1>
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
