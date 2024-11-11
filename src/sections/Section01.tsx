import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useTextEffect from "../Hooks/useTextEffect";
import Matter from "matter-js";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  background: #2b2a3a;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  .se1_main {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 6rem;
    .sec1Text {
      /* width: ; */
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-family: DungGeunMo;
      letter-spacing: -0.25rem;
      .sec1Text_top {
        .tipingText {
          /* width: 27.5rem; */
          color: var(--main-color);
          position: relative;
          font-size: 5.5rem;
          &::after {
            content: "";
            display: block;
            position: absolute;
            right: -0.75rem;
            width: 0.25rem;
            height: 90%;
            top: 0;
            background-color: rgba(255, 255, 255, 0.35);
            animation: cursorAnimation 1.5s infinite;
          }
        }
        span:nth-child(2) {
          font-size: 4.25rem;
        }
      }
      .sec1Text_btm {
        font-size: 5rem;
      }
    }
    .playbtn {
      font-family: DungGeunMo;
      font-size: 3rem;
      color: #fff;
      background: var(--main-color);
      /* border: 3px solid; */
      border-image-outset: 2;
      padding: 2px 20px;
      /* box-shadow: inset -4px -4px #006bb3; */
      /* box-shadow: 6px 6px 0 #fff; */
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: translate(4px, 4px);
      }
    }
  }

  .bgIcons {
    width: 100%;
    height: calc(100vh - 8rem);
    top: 0;
    left: 0;
    position: absolute;
    .clouds {
      width: 100%;
      height: 100%;
      position: absolute;
      > img {
        position: absolute;
        transform: scale(0.7);
        animation: cloudFlow 4s ease-in-out alternate infinite;
        &:nth-child(1) {
          top: 20%;
          left: 10%;
        }
        &:nth-child(2) {
          top: 30%;
          left: 85%;
          animation-delay: 0.5s;
        }
        &:nth-child(3) {
          top: 45%;
          left: 5%;
          animation-delay: 1s;
        }
        &:nth-child(4) {
          top: 55%;
          left: 80%;
          animation-delay: 1.5s;
        }
      }
    }
    .blocks {
      width: 100%;
      height: 100%;
      position: absolute;
      .block {
        position: absolute;
        width: 12.5rem;
        height: fit-content;
        /* top: -100%; */
        &:nth-child(1) {
          top: 60%;
          left: 10%;
        }
        &:nth-child(2) {
          top: 75%;
          left: 75%;
          /* right: 5%; */
        }
        left: 0;
        .lightGreen {
          width: 100%;
          height: 0.875rem;
          background: #90c35c;
        }
        .green {
          width: 100%;
          height: 1.5rem;
          background: #50b146;
        }
        .brown {
          width: 100%;
          height: 3rem;
          background: #673832;
        }
      }
    }
    .pixelicons {
      width: 100%;
      height: 100%;
      position: absolute;
      > img {
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 6rem;
      }
      .iconArrow {
        position: absolute;
        bottom: 5rem;
        left: 15%;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: movemeTextAni 1s infinite alternate;
        img {
          width: 2rem;
          transform: rotate(45deg);
        }
        p {
          font-size: 2rem;
          font-family: DungGeunMo;
          padding-bottom: 2rem;
          text-transform: uppercase;
        }
      }
    }
  }

  .sec1btm {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    .lightGreen {
      width: 100%;
      height: 1.5rem;
      background: #90c35c;
    }
    .green {
      width: 100%;
      height: 2rem;
      background: #50b146;
    }
    .brown {
      width: 100%;
      height: 4.5rem;
      background: #673832;
    }
  }

  @keyframes cursorAnimation {
    0%,
    45%,
    90%,
    100% {
      opacity: 1;
    }
    50%,
    85% {
      opacity: 0;
    }
  }

  @keyframes cloudFlow {
    0% {
      transform: scale(0.7) translateX(0);
    }
    100% {
      transform: scale(0.7) translateX(-50%);
    }
  }

  @keyframes movemeTextAni {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10%);
    }
  }
`;

interface onMoveBox {
  onMoveBox: () => void;
}

interface Position {
  x: number;
  y: number;
}

const Section01 = ({ onMoveBox }: onMoveBox) => {
  const textArray = ["프론트엔드", "노력하는", "REACT", "공부하는"];
  const displayText = useTextEffect({ texts: textArray });
  const [moveText, setMoveText] = useState<boolean>(true);

  const iconRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const MOVE_AMOUNT = 2;
  const JUMP_HEIGHT = 50; // 점프 높이 (px)

  const handleCharter = (e: KeyboardEvent<HTMLDivElement>) => {
    setMoveText(false);
    const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    if (e.key === "Alt") {
      setPosition((prev) => ({ ...prev, y: -JUMP_HEIGHT }));
      setTimeout(() => {
        setPosition((prev) => ({ ...prev, y: 0 }));
      }, 300);
    }

    switch (e.key) {
      case "ArrowLeft":
        setIsLeft(true);
        setPosition((prev: Position) => ({
          ...prev,
          x: Math.max(-vwToPx(10), prev.x - vwToPx(MOVE_AMOUNT)),
        }));
        break;
      case "ArrowRight":
        setIsLeft(false);
        setPosition((prev: Position) => ({
          ...prev,
          x: Math.min(vwToPx(70), prev.x + vwToPx(MOVE_AMOUNT)),
        }));
        break;
    }
  };

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const { Engine, Render, World, Bodies, Runner } = Matter;
    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: sceneRef.current!.clientWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    blockRefs.current.forEach((block) => {
      if (!block) return;

      const rect = block.getBoundingClientRect();
      const blockBody = Bodies.rectangle(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
        rect.width,
        rect.height,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      );
      World.add(engine.world, blockBody);
    });

    const walls = [
      // 바닥
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        260,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
      // 왼쪽 벽
      Bodies.rectangle(0, window.innerHeight / 2, 60, window.innerHeight, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      // 오른쪽 벽
      Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        60,
        window.innerHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
    ];

    World.add(engine.world, walls);

    // const createStar = () => {
    //   const star = Bodies.circle(
    //     Math.random() * (window.innerWidth - 100) + 50, // 벽 안쪽에서만 생성
    //     -30,
    //     15,
    //     {
    //       render: {
    //         fillStyle: "#FFD700",
    //       },
    //       restitution: 0.3, // 탄성 감소
    //       friction: 0.1,
    //       density: 0.001, // 밀도 감소
    //     }
    //   );
    //   World.add(engine.world, star);
    // };

    // const createStar = () => {
    //   const star = Bodies.circle(
    //     Math.random() * (window.innerWidth - 100) + 50,
    //     -30,
    //     15,
    //     {
    //       render: {
    //         fillStyle: 'transparent',
    //         element: document.createElement('i'),  // element를 render 안으로
    //         visible: true
    //       },
    //       restitution: 0.3,
    //       friction: 0.1,
    //       density: 0.001
    //     }
    //   );

    //   // element에 클래스 추가
    //   if (star.render.element instanceof HTMLElement) {
    //     star.render.element.className = 'nes-icon is-large star';
    //   }

    //   World.add(engine.world, star);
    // };

    const createStar = () => {
      const star = Bodies.circle(
        Math.random() * (window.innerWidth - 100) + 50,
        -30,
        15,
        {
          render: {
            fillStyle: "#FFD700", // 일단 기본 색상으로
            visible: true,
          },
          restitution: 0.3,
          friction: 0.1,
          density: 0.001,
        }
      );

      World.add(engine.world, star);
    };

    const starInterval = setInterval(createStar, 5000);

    // Engine.run(engine);
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      clearInterval(starInterval);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <Container>
      <div
        ref={sceneRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0, // 추가
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 100, // 필요에 따라 조정
        }}
      />
      <article className="se1_main">
        <div className="sec1Text">
          <div className="sec1Text_top">
            <span className="tipingText">{displayText}</span>
            <span> 개발자</span>
          </div>
          <div className="sec1Text_btm">
            <span>송채영 포트폴리오</span>
          </div>
        </div>
        {/* <button className="playbtn nes-btn is-primary">PLAY</button> */}
        <div
          className="playbtn nes-container is-rounded is-dark"
          onClick={onMoveBox}
        >
          PLAY
        </div>
      </article>
      <article className="bgIcons">
        <div className="clouds">
          <img src="/pixelart/clound0.png" alt="clound" />
          <img src="/pixelart/clound1.png" alt="clound" />
          <img src="/pixelart/clound2.png" alt="clound" />
          <img src="/pixelart/clound3.png" alt="clound" />
        </div>
        <div className="blocks">
          <div className="block" ref={(el) => (blockRefs.current[0] = el)}>
            <div className="lightGreen"></div>
            <div className="green"></div>
            <div className="brown"></div>
          </div>
          <div className="block" ref={(el) => (blockRefs.current[1] = el)}>
            <div className="lightGreen"></div>
            <div className="green"></div>
            <div className="brown"></div>
          </div>
        </div>
        <div
          className="pixelicons"
          ref={iconRef}
          tabIndex={0}
          onKeyDown={handleCharter}
          style={{
            outline: "none",
          }}
        >
          {moveText && (
            <div className="iconArrow">
              <img src="/pixelart/arr.png" alt="arrow" />
              <p>move me!</p>
            </div>
          )}

          <img
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scaleX(${
                isLeft ? -1 : 1
              }) `,
              transformOrigin: "center",
              transition: "transform 0.2s ease",
              outline: "none",
            }}
            src="/pixelart/pixelicon.png"
            alt="pixelicon"
          />
        </div>
        <div className="dropdownStar">
          <i className="nes-icon is-large star"></i>
        </div>
      </article>

      <article className="sec1btm">
        <div className="lightGreen"></div>
        <div className="green"></div>
        <div className="brown"></div>
      </article>
    </Container>
  );
};

export default Section01;
