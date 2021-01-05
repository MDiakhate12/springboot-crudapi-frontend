import React from "react";
import Lottie from "react-lottie";
import animationData from "../../lotties/red-plus-button";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },

};

export default function AddButtonAnimated() {
  return (
    <div>
      <Lottie options={defaultOptions} height={175} width={175} speed={1.25} />
    </div>
  );
}
