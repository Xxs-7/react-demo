import React from "react";
import styles from "./index.module.less";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export default function ScrollbarOverlay() {
  return (
    <div className={styles.background}>
      <OverlayScrollbarsComponent
        // element="span"
        style={{ maxHeight: "200px" }}
        options={{
          scrollbars: {
            autoHide: "scroll",
            theme: styles["scrollbars"],

            // theme: scrollbarClass || "",
            visibility: "visible",
          },
          autoHide: "scroll",
        }}
        className={styles[`list`]}
        // events={{ scroll: () => { /* ... */ } }}
        defer
      >
        {new Array(100).fill(0).map((_, i) => (
          <div key={i} className="h-8">
            hello
          </div>
        ))}
      </OverlayScrollbarsComponent>
    </div>
  );
}
