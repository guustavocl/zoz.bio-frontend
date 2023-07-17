"use client";
import { useEffect } from "react";

const Username = () => {
  const usernameInit = "username";

  useEffect(() => {
    console.log("effect");
  }, []);

  return (
    <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center w-full">
      <span className="text-violet-400">zoz.bio/</span>
      <span id="username" className="text-secondary">
        {usernameInit}
      </span>
    </h1>
  );
};
export default Username;
