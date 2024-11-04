import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const AboutSetion = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 2.5rem;
  h1 {
    /* margin-top: 1.25rem; */
    text-align: center;
    font-family: "DungGeunMo";
    font-size: 4rem;
    letter-spacing: 0.09rem;
  }
  .qna_container {
    display: flex;
    align-items: center;
    gap: 3.125rem;
    img {
      width: 20rem;
      height: 20rem;
    }
    .qna {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      li {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
        width: 37.5rem;
        h4 {
          font-family: "DungGeunMo";
          font-size: 1.5em;
          letter-spacing: -0.02rem;
          span {
            color: var(--main-color);
          }
        }
        p {
          font-size: 0.9375rem;
          line-height: 140%;
          letter-spacing: -0.02rem;
        }
      }
    }
  }
  .desc {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    > div {
      width: 62.5rem;
    }
    h2 {
      font-family: "DungGeunMo";
      font-size: 1.625rem;
      margin-bottom: 0.625rem;
    }
    h4 {
      font-size: 1.25rem;
      letter-spacing: -0.02rem;
      margin-bottom: 0.375rem;
      small {
        font-size: 70%;
        letter-spacing: -0.02rem;
        color: #ccc;
      }
    }
    p {
      font-size: 0.9rem;
      line-height: 140%;
      letter-spacing: -0.02rem;
    }
  }
`;

gsap.registerPlugin(ScrollTrigger);

const Section02 = forwardRef<HTMLElement>((_, ref) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 90%",
        end: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      ".qna_container",
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(
      ".desc",
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
  }, []);

  return (
    <>
      <AboutSetion className="inner" ref={ref}>
        <h1>ABOUT</h1>
        <article className="qna_container" ref={boxRef}>
          <img src="/pixelart/aboutImg.png" alt="aboutImg" />
          <ul className="qna">
            <li>
              <h4>
                <span>성장</span>과 <span>성취</span>에 대한 즐거움
              </h4>
              <p>
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
              </p>
            </li>
            <li>
              <h4>
                <span>성장</span>과 <span>성취</span>에 대한 즐거움
              </h4>
              <p>
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
              </p>
            </li>
            <li>
              <h4>
                <span>성장</span>과 <span>성취</span>에 대한 즐거움
              </h4>
              <p>
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
                즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
              </p>
            </li>
          </ul>
        </article>
        <article className="desc">
          <div>
            <h2>교육</h2>
            <h4>
              강남이젠아카데미 <small>(24.06~ 24.12)</small>
            </h4>
            <p>
              웹사이트나 앱의 화면을 만드는 Figma 활용해 화면 디자인을 작업 +
              React, node을 활용해 화면을 구성하고 설계 +생성형 AI(ChatGPT)를
              활용하여 원하는 프롬프트 명령어로 원하는 코드를 생성했습니다. 이를
              통해 개발 과정이 더 빠르고 효율적으로 진행할 수 있는 프론트엔드
              개발자(코딩) 부트캠프 교육과정을 수료하였습니다.
            </p>
          </div>
          <div>
            <h2>이력</h2>
            <h4>
              건축사사무소 에스파스 <small>(22.01~ 24.04)</small>
            </h4>
            <p>
              웹사이트나 앱의 화면을 만드는 Figma 활용해 화면 디자인을 작업 +
              React, node을 활용해 화면을 구성하고 설계 +생성형 AI(ChatGPT)를
              활용하여 원하는 프롬프트 명령어로 원하는 코드를 생성했습니다. 이를
              통해 개발 과정이 더 빠르고 효율적으로 진행할 수 있는 프론트엔드
              개발자(코딩) 부트캠프 교육과정을 수료하였습니다.
            </p>
          </div>
        </article>
      </AboutSetion>
    </>
  );
});

export default Section02;
