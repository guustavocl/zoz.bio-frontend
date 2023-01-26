import React from "react";
import HomeSection from "./HomeSection";
import HomeSection2 from "./HomeSection2";

const Home = () => {
  return (
    <React.Fragment>
      {/* <div className="overflow-hidden w-20"> */}
      <div className="w-full h-full">
        <HomeSection />
        <HomeSection2 />
      </div>
    </React.Fragment>
  );
};

export default Home;
