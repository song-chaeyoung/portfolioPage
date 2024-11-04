import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ComputerDisplaySc4 from "../components/ComputerDisplaySc4";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
  .bgText {
    /* display: flex;
    flex-direction: column; */
    p {
      font-size: 12.5rem;
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

const Section04 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const fadeInRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      const startTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 10%",
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
      startTl.to(".computer", {
        // scale: 1.2,
        // ease: "power2.out",
      });
      let prevProgress = 1;
      const computerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: sectionRef.current,
          pinSpacing: true,
          // end: "bottom top",
          scrub: 1,
          // markers: true,
          onUpdate: (self) => {
            // console.log("Progress:", self.progress); // 애니메이션 진행 상태 로그
          },
        },
      });
      computerTl
        .to(".computer", {
          scale: 8.2,
          y: "90vh", // 뷰포트 높이의 50%로 이동
          x: "-8vw",
        })
        .to(fadeInRef.current, {
          opacity: 1,
        });
    }
  }, []);

  return (
    <>
      <Container className="section4" ref={sectionRef}>
        <div className="bgText">
          <p ref={textRef1}>
            <span>SongChaeYoung</span> PortPolio
          </p>
          <p ref={textRef2}>
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
    </>
  );
};

export default Section04;
