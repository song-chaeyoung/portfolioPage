import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";
import ComputerDisplaySc4 from "../components/ComputerDisplaySc4";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
  .bgText {
    p {
      font-size: 15rem;
      text-transform: uppercase;
      white-space: nowrap;
      width: 100%;
      opacity: 0.76;
      &:nth-child(1) {
        transform: translateX(0%);
      }
      &:nth-child(2) {
        color: var(--main-color);
        transform: translateX(-75%);
      }
      span {
        font-family: "SDSamliphopangche_Outline";
      }
    }
  }
  .computer {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    /* transform-origin: bottom; */
    img {
      width: 31.25rem;
      height: 31.01144rem;
    }
  }
`;

const ComputerDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;
  background: #000;
  z-index: 100;
`;

const Section04 = (_: any, ref: React.ForwardedRef<HTMLDivElement>) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const textRef3 = useRef<HTMLParagraphElement>(null);
  const fadeInRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      const startTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          // start: "top top",
          // start: "top+=100 top",
          end: "top top",
          scrub: 1,
          // markers: true,
        },
      });
      startTl.to(
        textRef1.current,
        {
          // duration: 1,
          translateX: "-75%",
        },
        0
      );
      startTl.to(
        textRef2.current,
        {
          // duration: 1,
          translateX: "0%",
        },
        0
      );
      startTl.to(
        textRef3.current,
        {
          // duration: 1,
          translateX: "-75%",
        },
        0
      );
      startTl.to(".computer", {
        // scale: 1.1,
        // ease: "power2.out",
      });

      const computerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: sectionRef.current,
          pinSpacing: true,
          // end: "bottom top",
          scrub: 2,
          // markers: true,
        },
      });
      computerTl
        .to(".computer", {
          scale: 8.2,
          y: "90vh",
          x: "-8vw",
        })
        .to(fadeInRef.current, {
          opacity: 1,
        })
        .to({}, { duration: 2 });
    }
  }, []);

  return (
    <Container className="section4" ref={sectionRef}>
      <div className="bgText" ref={ref}>
        <p ref={textRef1}>
          <span>SongChaeYoung</span> PortPolio
        </p>
        <p ref={textRef2}>
          <span>SongChaeYoung</span> PortPolio
        </p>
        <p ref={textRef3}>
          <span>SongChaeYoung</span> PortPolio
        </p>
      </div>
      <div className="computer">
        <img src="/pixelart/computer.svg" alt="computer" />
      </div>
      <ComputerDisplay className="fadeInComponent" ref={fadeInRef}>
        <ComputerDisplaySc4 />
      </ComputerDisplay>
    </Container>
  );
};

export default forwardRef<HTMLDivElement, any>(Section04);
