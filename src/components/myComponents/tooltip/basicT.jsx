import React from "react";
import styles from "./basicT.module.css";

export default function BasicTDemo() {
  return (
    <div className={styles.container}>
      <div className={styles["tooltip-container"]}>
        Hover over me
        <div className={styles["tooltip"]}>Tooltip with Arrow</div>
      </div>
    </div>
  );
}
