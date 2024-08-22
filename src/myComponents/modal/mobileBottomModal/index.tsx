import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
// import close from "./images/close.svg";
// import styles from "./index.module.less";
import styles from "./index.module.less";

interface IModalTipProps {
  visible: boolean;
  className?: string;
  title?: string;
  children?: string | React.ReactElement;
  renderFooter?: () => React.ReactElement;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const MobileModalTip = (props: IModalTipProps) => {
  const {
    visible,
    className,
    title,
    children,
    renderFooter,
    handleOk,
    handleCancel,
  } = props;

  const modalRef = useRef(null);
  const bodyRef = useRef(null);
  const [curVisible, setCurVis] = useState(false);

  useEffect(() => {
    if (modalRef && modalRef.current) {
      // const cancelPropagation = (modalRef) => {
      //   modalRef.current.ontouchstart = (e) => {
      //     e.stopPropagation();
      //   };
      //   modalRef.current.ontouchmove = (e) => {
      //     e.stopPropagation();
      //   };
      //   modalRef.current.ontouchend = (e) => {
      //     e.stopPropagation();
      //   };
      // };
      const handleModalClick = (modalRef, bodyRef) => {
        if (!bodyRef || !bodyRef.current) return;
        const handleClick = (e) => {
          if (!bodyRef.current.contains(e.target)) {
            handleCancel && handleCancel();
            setCurVis(false);
          }
        };
        modalRef.current.addEventListener("click", handleClick, false);
        return () =>
          modalRef.current &&
          modalRef.current.removeEventListener("click", handleClick, false);
      };
      // cancelPropagation(modalRef);
      const remove = handleModalClick(modalRef, bodyRef);
      return remove;
    }
  }, []);

  useEffect(() => {
    setCurVis(visible);
  }, [visible]);

  const handleClose = () => {
    handleCancel && handleCancel();
    setCurVis(false);
  };

  const handleSubmit = () => {
    handleOk && handleOk();
    setCurVis(false);
  };

  return ReactDOM.createPortal(
    <div
      className={styles.root}
      ref={modalRef}
      style={{ display: curVisible ? "" : "none", position: "fixed" }}
    >
      <div className={classNames(styles.main, className)} ref={bodyRef}>
        <div className={styles.title}>
          <span>{title}</span>
          <span className={styles.close} onClick={handleClose}>
            x
          </span>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.driver}></div>
        <div className={styles.footer}>
          {renderFooter ? (
            renderFooter()
          ) : (
            <div className={styles.footerBtn} onClick={handleSubmit}>
              免费使用
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const MobileModalTipDemo = () => {
  return (
    <MobileModalTip
      visible={true}
      handleOk={() => {
        console.log("hello");
      }}
    >
      使用EverCraft可以提升设计师的工作效率，快来试试吧~
    </MobileModalTip>
  );
};
export default MobileModalTipDemo;
