import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding-bottom: 4rem;
  background: #2b2a3a;
  .se2Ttile {
    text-align: center;
    font-family: "DungGeunMo";
    font-size: 4rem;
    letter-spacing: 0.09rem;
  }
  .se2Container {
    max-width: 67.5rem;
    border: 2px solid #fff;
    padding: 2rem;
    border-radius: 1.25rem;
    display: flex;
    gap: 2rem;
    .profileImg {
      flex: 2;
      width: 21.875rem;
      border-radius: 1.25rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .profileText {
      flex: 5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      letter-spacing: -0.0375rem;
      .title {
        font-family: DungGeunMo;
        letter-spacing: -0.15rem;
        > h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        > h5 {
          font-size: 1.25rem;
          word-break: keep-all;
          /* color: #ddd; */
          line-height: 120%;
        }
      }

      h4 {
        font-family: DungGeunMo;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        span {
          color: var(--main-color);
        }
      }
      p {
        font-size: 1rem;
        line-height: 140%;
        letter-spacing: -0.02rem;
        color: #eee;
      }
    }
  }
  .se2BtmIcons {
    width: 100%;
    max-width: 67.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btmIcons_hearts {
      display: flex;
      gap: 1rem;
      perspective: 1000px;
      > i {
        animation: rotateCenter 5s linear infinite;
        transform-origin: center;
        margin: 0 5px;
        transform-style: preserve-3d;
      }
    }
    .btmIcons_contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      > a {
        padding-bottom: 0.5rem;
        border-bottom: 3px solid transparent;
        transition: all 0.3s;
        &:hover {
          border-bottom: 3px solid var(--main-color);
        }
      }
    }
  }

  @keyframes rotateCenter {
    0% {
      transform: scale(2.5) rotateY(0deg);
    }
    100% {
      transform: scale(2.5) rotateY(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
    .se2Container {
      flex-direction: column;
      align-items: center;
    }
    .se2BtmIcons {
      .btmIcons_hearts {
        gap: 0.5rem;
        > i {
          animation: rotateCenterMobile 5s linear infinite;
        }
      }
      .btmIcons_contact {
        gap: 0.5rem;
        > a {
          transform: scale(0.7);
        }
      }
    }

    @keyframes rotateCenterMobile {
      0% {
        transform: scale(2) rotateY(0deg);
      }
      100% {
        transform: scale(2) rotateY(360deg);
      }
    }
  }
`;

gsap.registerPlugin(ScrollTrigger);

const Section02 = forwardRef<HTMLElement>((_, ref) => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".se2Continaer",
        start: "top 60%",
        end: "center center",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      ".qna",
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )
      .fromTo(
        ".eduInfo",
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        ".workInfo",
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.5"
      );
  }, []);
  return (
    <Container className="se2Continaer" ref={ref}>
      <div className="se2Ttile">ABOUT</div>
      <div className="se2Container">
        <div className="profileImg">
          <img src="/pixelart/aboutMe.jpg" alt="aboutMe" />
        </div>
        <ul className="profileText">
          <li className="title">
            <h2>안녕하세요 프론트엔드 송채영입니다</h2>
          </li>
          <li className="qna">
            <h4>첫인상을 사로잡는 프론트엔드</h4>
            <p>
              즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도 즐거움에
              대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도 즐거움에 대한
              내용 세줄 정도 즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용
              세줄 정도 즐거움에 대한 내용 세줄 정도
            </p>
          </li>
          <li className="eduInfo">
            <h4>즐거움을 느끼는 프론트엔드</h4>
            <p>
              성장과 성취에 대한 즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용
              세줄 정도 즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄
              정도 즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
              즐거움에 대한 내용 세줄 정도 즐거움에 대한 내용 세줄 정도
            </p>
          </li>
          <li className="workInfo">
            <h4>발전하는 프론트엔드</h4>
            <p>
              개발시 새롭게 얻은 지식이나 문제 해결 방식을 블로그에 기록하며
              공부하고 있습니다.
            </p>
          </li>

          {/* <li className="eduInfo">
            <h2>교육</h2>
            <h4>
              K-Digital Training 기업연계 프론트엔드 개발
              <small>(24.06~ 24.12)</small>
            </h4>
            <p>
              웹사이트나 앱의 화면을 만드는 Figma 활용해 화면 디자인을 작업 +
              React, node을 활용해 화면을 구성하고 설계 +생성형 AI(ChatGPT)를
              활용하여 원하는 프롬프트 명령어로 원하는 코드를 생성했습니다. 이를
              통해 개발 과정이 더 빠르고 효율적으로 진행할 수 있는 프론트엔드
              개발자(코딩) 부트캠프 교육과정을 수료하였습니다.
            </p>
          </li>
          <li className="workInfo">
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
          </li> */}
        </ul>
      </div>
      <div className="se2BtmIcons">
        <div className="btmIcons_hearts">
          <i className="nes-icon is-large heart"></i>
          <i className="nes-icon is-medium heart"></i>
          <i className="nes-icon is-medium heart"></i>
          <i className="nes-icon is-medium heart"></i>
          <i className="nes-icon is-medium heart"></i>
        </div>
        <div className="btmIcons_contact">
          <a href="mailto:call0512@naver.com" target="_blank">
            <i className="nes-icon gmail is-medium"></i>
          </a>
          <a href="https://github.com/song-chaeyoung" target="_blank">
            <i className="nes-icon github is-medium"></i>
          </a>
          <a href="https://velog.io/@scy512" target="_blank">
            <img src="/pixelart/velog_logo.png" alt="velog_logo" />
          </a>
        </div>
      </div>
    </Container>
  );
});

export default Section02;
