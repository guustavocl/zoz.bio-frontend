import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <div className="center flex flex-wrap gap-10 p-10 mb-20 px-60">
        {[...Array(20)].map((x, i) => (
          <div
            key={i}
            style={{
              width: "400px",
              height: "400px",
              borderRadius: 10,
              backgroundColor: "#333",
              opacity: 0.2,
              padding: 10,
              // margin: 50,
            }}
          ></div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
