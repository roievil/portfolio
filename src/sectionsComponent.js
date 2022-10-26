import React, { createContext, useRef, useContext } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import lerp from "lerp";
import state from "./store";

/**
 * Une section
 * @param {*} param0
 * @returns
 */

function SectionComponent({ content, ...props }) {
  return <div>{content}</div>;
}

export { SectionComponent };
