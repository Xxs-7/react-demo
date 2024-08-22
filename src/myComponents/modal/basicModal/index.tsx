import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
interface ModelSlotProps {}

const BasicModal = ({ children }: React.PropsWithChildren<ModelSlotProps>) => {
  return ReactDOM.createPortal(children, document.body);
};

export const BasicModalDemo = () => {
  const [visible, setIsVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsVisible((_visible) => !_visible);
        }}
      >
        hide
      </button>
      {visible && (
        <>
          <BasicModal>
            <div className={styles.modal}>
              <div className={styles.content}>
                <span>标题</span>
                <span
                  onClick={() => {
                    setIsVisible((_visible) => !_visible);
                  }}
                >
                  X
                </span>
                <div>hello world</div>
              </div>
            </div>
          </BasicModal>
        </>
      )}
      <BasicModal>
        <div className={styles.modal}>
          <div className={styles.content}>
            <span>标题</span>
            <span
              onClick={() => {
                setIsVisible((_visible) => !_visible);
              }}
            >
              X
            </span>
            <div>hello world</div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};
export default BasicModal;
