import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Block } from "./blocks";
import { SectionComponent } from "./sectionsComponent";
import { Shapes, Categories, Box, RhinoModel2 } from "./Home";
import state from "./store";
import "./styles.css";

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree();
  return (
    <Html
      portal={portal}
      style={{
        position: "absolute",
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
      }}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  );
}

function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.code == "Escape" || event.code == "Enter") {
        console.log("state from index.js", state);
      }
    });
  }, []);

  console.log("state from index.js", state);
  return (
    <>
      <Canvas
        //colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("white");
          gl.toneMappingExposure = 2.5;
          gl.toneMappingWhitePoint = 1;
          // Export canvas events, we will put them onto the scroll area
          setEvents(events);
        }}
      >
        <Block factor={1.5} offset={0}>
          <Shapes />
          <HtmlContent portal={domContent}>
            <div className="menu left" style={{ top: "2.55rem" }}>
              <h2 style={{ fontSize: "1.5em", top: "4rem" }}>
                Olivier Glorieux
              </h2>
            </div>
            <div className="menu right">
              <span>
                <a href="#section4">Contact</a>
              </span>
            </div>
            <div className="menu middle">
              <span>
                <a href="#section1">Maker</a>
              </span>
              <span>
                <a href="#section2">Formateur</a>
              </span>
              <span>
                <a href="#section3">Programmeur</a>
              </span>
            </div>
            <div className="jumbo">
              <h1>
                browser
                <br />
                based
                <br />
                modeling.
              </h1>
              {/* <Categories /> */}
            </div>
          </HtmlContent>
        </Block>

        <Block factor={1.5} offset={1}>
          <Box />
          <Html center portal={domContent}>
            <h2 id="section1">Maker</h2>
            <SectionComponent content="test1" />
          </Html>
        </Block>

        <Block factor={1.5} offset={2}>
          <Box />
          <Html center portal={domContent}>
            <h2 id="section2">Formateur</h2>
          </Html>
        </Block>

        <Block factor={1.5} offset={3}>
          {/* <RhinoModel2 scale={[2, 2, 2]} /> */}
          <Html center portal={domContent}>
            <h2 id="section3">Programmeur</h2>
          </Html>
        </Block>

        <Block factor={-2} offset={4}>
          <Html center portal={domContent}>
            <h2 id="section4">Contact</h2>
          </Html>
        </Block>
      </Canvas>

      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
