import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-2 h-full">
        <div className="md:col-start-3 col-span-12 md:col-span-8 overflow-y-scroll">
          {[...Array(20)].map((x, i) => (
            <div
              key={i}
              className="m-2"
              style={{
                height: "200px",
                borderRadius: 10,
                backgroundColor: "#333",
                opacity: 0.2,
                padding: 10,
              }}
            ></div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
