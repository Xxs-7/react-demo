import React from "react";
import "./animate.css";

const GradientAnimation = () => {
  return (
    <div className="container">
      <div className="box gradient"></div>
    </div>
  );
};

const RotateAnimation = () => {
  return (
    <div className="container">
      <div className="box rotate"></div>
    </div>
  );
};

const ScaleAnimation = () => {
  return (
    <div className="container">
      <div className="box scale"></div>
    </div>
  );
};

const TranslateAnimation = () => {
  return (
    <div className="container">
      <div className="box translate"></div>
    </div>
  );
};

const BounceAnimation = () => {
  return (
    <div className="container">
      <div className="box bounce"></div>
    </div>
  );
};

const FlashAnimation = () => {
  return (
    <div className="container">
      <div className="box flash"></div>
    </div>
  );
};

const FadeAnimation = () => {
  return (
    <div className="container">
      <div className="box fade"></div>
    </div>
  );
};

const AnimateDemo = () => {
  return (
    <>
      <GradientAnimation />
      <RotateAnimation />
      <ScaleAnimation />
      <TranslateAnimation />
      <BounceAnimation />
      <FlashAnimation />
      <FadeAnimation />
    </>
  );
};

export default AnimateDemo;
