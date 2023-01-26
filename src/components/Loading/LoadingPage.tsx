import React from "react";
import LazyLoadImage from "./LazyLoadImage";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <React.Fragment>
      {/* Default background  */}
      <LazyLoadImage />

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
