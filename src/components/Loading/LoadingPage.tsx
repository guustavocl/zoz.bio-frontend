import React from "react";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <React.Fragment>
      <div
        className="absolute w-full h-screen bg-gradient-to-br -z-50"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundImage: `url("./bg.png")`,
          opacity: 0.2,
        }}
      ></div>
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
      </div>
    </React.Fragment>
  );
};

export default LoadingPage;
