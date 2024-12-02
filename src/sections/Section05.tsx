import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { mobileSizeContext } from "../App";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #212429; */
  /* background: #2b2a3a; */
  background: linear-gradient(to bottom, #2b2a3a 60%, rgba(0, 111, 255, 0.7));

  .ballon {
    position: absolute;
    top: 25%;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
    background: #2b2a3a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 2.88rem; */
    gap: 1rem;
    box-shadow: none;
    padding: 2.5rem 5rem;
    /* margin-bottom: 8rem; */
    .contact_text {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h3 {
        font-family: DungGeunMo;
        font-size: 2.75rem;
      }
      p {
        font-size: 1.25rem;
        line-height: 140%;
        word-break: keep-all;
      }
    }
  }

  .contact_icons {
    display: flex;
    gap: 1.875rem;
    margin-top: 1.875rem;
    .contact_icon {
      a {
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s;
        .contact_icon_text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.3rem;
          letter-spacing: -0.0625rem;
          p {
            &:nth-child(1) {
              font-weight: 700;
            }
            &:nth-child(2) {
              color: #ccc;
              font-size: 0.9rem;
              white-space: nowrap;
            }
          }
        }
        &:hover {
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }
  .icon_walking {
    width: 8.25rem;
    height: 8.25rem;
    position: absolute;
    left: 0;
    /* bottom: 13vh; */
    bottom: 8rem;
    /* animation: iconWalking 5s linear infinite; */
    /* top: -8.25rem; */
    /* left: 16%; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .btmGround {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;

    .lightGreen {
      width: 100%;
      height: 1.5rem;
      background-color: #90c35c;
    }
    .green {
      width: 100%;
      width: 120rem;
      height: 2rem;
      background: #50b146;
    }
    .brown {
      width: 100%;
      height: 4.5rem;
      background: #673832;
    }
  }

  .starts {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh - 8rem);
    img {
      position: absolute;
      animation: starEvent 4s linear both infinite;
      &:nth-child(1),
      &:nth-child(5) {
        animation-delay: 0.25s;
      }
      &:nth-child(2),
      &:nth-child(6) {
        animation-delay: 0.5s;
      }
      &:nth-child(3),
      &:nth-child(7) {
        animation-delay: 1s;
      }
      &:nth-child(4),
      &:nth-child(8) {
        animation-delay: 1.5s;
      }
    }
  }

  @keyframes iconWalking {
    0% {
      left: 0;
    }
    100% {
      left: 30vh;
    }
  }

  @keyframes starEvent {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    .ballon {
      top: 15%;
      width: fit-content;
      padding: 2rem 4rem;
      /* padding: 0; */
      /* margin: 0 1rem; */
      margin: 0 auto;
      .contact_text {
        width: 100%;
      }
    }
    .contact_icons {
      flex-direction: column;
      .contact_icon {
        a {
          .contact_icon_text {
            p {
              &:nth-child(2) {
                font-size: 1.15rem;
              }
            }
          }
          /* i {
            transform: scale(1.8);
            img {
              transform: scale(0.5);
            }
          } */
        }
      }
    }
    .starts {
      display: none;
    }
    .icon_walking {
      /* animation: iconWalkingMobile 5s linear; */
    }
  }
`;

const STARS = [
  {
    image: "/pixelart/star1.png",
    position: { left: "5%", top: "45%" },
  },
  {
    image: "/pixelart/star3.png",
    position: { left: "85%", top: "20%" },
  },
  {
    image: "/pixelart/star2.png",
    position: { left: "15%", top: "60%" },
  },
  {
    image: "/pixelart/star4.png",
    position: { left: "95%", top: "65%" },
  },
  {
    image: "/pixelart/star4.png",
    position: { left: "15%", top: "35%" },
  },
  {
    image: "/pixelart/star2.png",
    position: { left: "70%", top: "17%" },
  },
  {
    image: "/pixelart/star3.png",
    position: { left: "20%", top: "15%" },
  },
  {
    image: "/pixelart/star1.png",
    position: { left: "88%", top: "45%" },
  },
];

const Section05 = () => {
  const mobileSize = useContext(mobileSizeContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const initialPositions = STARS.map(() => ({
  //     top: Math.floor(Math.random() * window.innerHeight),
  //     left: Math.floor(Math.random() * window.innerWidth),
  //   }));
  //   setPositions(initialPositions);
  // }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.set(iconRef.current, {
        x: 0,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 3%",
        scrub: 1,
        onEnter: () => {
          if (iconRef.current) {
            gsap.to(iconRef.current, {
              translateX: mobileSize ? "1.5vw" : "17vw",
              duration: 3,
              ease: "easeInOut",
              onComplete: () => {
                const imgElement = iconRef.current?.querySelector("img");
                if (imgElement) {
                  imgElement.src = "/pixelart/pixelicon.png";
                }
              },
            });
          }
        },
      });
    }
  }, [mobileSize]);

  return (
    <Container ref={containerRef}>
      <div className="ballon_wrapper">
        <div className="nes-balloon from-left is-dark ballon">
          <div className="contact_text">
            <h3>감사합니다</h3>
            <p>
              프론트엔드 개발자로 성장하기 위해 낯선 기술에도 적극적으로
              도전하고, <br />
              항상 사용자의 관점에서 생각하며 사용하기 좋은 서비스를 만들고
              싶습니다.
            </p>
            <p>사소한 의견도 감사히 받겠습니다.</p>
          </div>
          <div className="contact_icons">
            <div className="contact_icon">
              <a href="https://github.com/song-chaeyoung" target="_blank">
                <i className="nes-icon github is-medium"></i>
                <div className="contact_icon_text">
                  <p>GITHUB</p>
                  <p>https://github.com/song-chaeyoung</p>
                </div>
              </a>
            </div>
            <div className="contact_icon">
              <a href="mailto:call0512@naver.com" target="_blank">
                <i className="nes-icon gmail is-medium"></i>
                <div className="contact_icon_text">
                  <p>MAIL</p>
                  <p>call0512@naver.com</p>
                </div>
              </a>
            </div>
            <div className="contact_icon">
              <a href="https://velog.io/@scy512" target="_blank">
                <i className="velog">
                  <img src="/pixelart/velog_logo.png" alt="velog" />
                </i>
                <div className="contact_icon_text">
                  <p>VELOG</p>
                  <p>https://velog.io/@scy512</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="icon_walking" ref={iconRef}>
        <img src="/pixelart/pixelicon_walk.gif" alt="walking" />
      </div>
      {/* <div className="icon_computer">
        <img src="/pixelart/iconComputer.png" alt="computer" />
      </div> */}
      <div className="btmGround">
        <div className="lightGreen"></div>
        <div className="green"></div>
        <div className="brown"></div>
      </div>
      <div className="starts">
        {STARS.map((star, idx) => (
          // <img src={it} alt="starts" key={idx} />
          <img
            src={star.image}
            alt="stars"
            key={idx}
            style={{
              position: "absolute",
              width: "3rem",
              height: "3rem",
              left: star.position.left,
              top: star.position.top,
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default Section05;
