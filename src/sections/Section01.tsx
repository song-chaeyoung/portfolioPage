import React, {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import useTextEffect from "../Hooks/useTextEffect";
import Matter from "matter-js";
import { mobileSizeContext } from "../App";

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
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    .sec1Text {
      /* width: ; */
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-family: DungGeunMo;
      letter-spacing: -0.25rem;
      .sec1Text_top {
        .tipingText {
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
          text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        }
      }
      .sec1Text_btm {
        font-size: 5rem;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
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
      pointer-events: auto;
      user-select: auto;
      -webkit-user-select: auto;
      -moz-user-select: auto;
      -ms-user-select: auto;
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
        width: auto;
        position: absolute;
        transform: scale(0.7);
        animation: cloudFlow 4s ease-in-out alternate infinite;
        &:nth-child(1) {
          top: 20%;
          left: 20%;
        }
        &:nth-child(2) {
          top: 30%;
          right: 5%;
          animation-delay: 0.5s;
        }
        &:nth-child(3) {
          top: 45%;
          left: 5%;
          animation-delay: 1s;
        }
        &:nth-child(4) {
          top: 55%;
          right: 15%;
          animation-delay: 1.5s;
          width: auto;
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
        /* box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.25); */
        /* top: -100%; */
        &:nth-child(1) {
          top: 60%;
          left: 10%;
        }
        &:nth-child(2) {
          top: 75%;
          right: 20%;
          /* right: 5%; */
        }
        /* left: 0; */
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
      .iconCharter {
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 6rem;
        .iconCharter_score {
          width: fit-content;
          font-size: 3rem;
          font-family: "DungGeunMo";
          letter-spacing: -0.5rem;
          color: #fff;
        }
        > img {
          width: 100%;
        }
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
        div {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        p {
          font-size: 2rem;
          font-family: DungGeunMo;
          /* padding-bottom: 2rem; */
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

  @media (max-width: 768px) {
    .sec1Text {
      .sec1Text_top {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tipingText {
          /* font-size: 3rem; */
          height: 5rem;
          font-size: 4.5rem !important;
        }
        span:nth-child(2) {
          font-size: 4.25rem !important;
        }
      }
      .sec1Text_btm {
        text-align: center;
        font-size: 4.5rem !important;
      }
    }

    .bgIcons {
      .clouds {
        > img {
          &:nth-child(1) {
            top: 15%;
            left: 35% !important;
          }
          &:nth-child(2) {
            display: none;
          }
          &:nth-child(3) {
            /* top: 45%; */
            left: 10%;
          }
          &:nth-child(4) {
            display: none;
          }
        }
      }
      .blocks {
        .block {
          width: 8rem;

          &:nth-child(1) {
            left: 5%;
          }
          &:nth-child(2) {
            right: 5%;
          }
        }
      }
      .pixelicons {
        > img {
          width: 8rem;
        }
        .iconArrow {
          display: none;
        }
      }
    }
  }
`;

interface Section01Props {
  onMoveBox: () => void;
}

interface Position {
  x: number;
  y: number;
}

const stars = [
  {
    name: "dropdownStar",
    imagePath: "/pixelart/dropdownstar.gif",
    size: 42,
    radius: 42 / 2,
  },
];

const Section01 = (
  { onMoveBox }: Section01Props,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const mobileSize = useContext(mobileSizeContext);
  const textArray = ["프론트엔드", "노력하는", "REACT", "공부하는"];
  const displayText = useTextEffect({ texts: textArray });
  const [moveText, setMoveText] = useState<boolean>(true);
  const [showScore, setShowScore] = useState<boolean>(false);

  const iconRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const myIconRef = useRef<HTMLImageElement>(null);
  const iconBodyRef = useRef<Matter.Body | null>(null);
  const dropdownStarRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const MOVE_AMOUNT = 2;
  const JUMP_HEIGHT = 50; // 점프 높이 (px)

  const handleCharter = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (moveText) setMoveText(false);

    const characterWidth =
      myIconRef.current?.getBoundingClientRect().width || 0;
    const screenWidth = window.innerWidth;
    // 초기 위치 (left: 10%)를 고려한 기준점
    const baseX = screenWidth * 0.1;
    // 이동 가능한 최대 범위 (전체 화면의 80% 정도)
    const maxMoveRange = screenWidth * 0.9;

    const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    if (e.key === "Alt") {
      setPosition((prev) => ({ ...prev, y: -JUMP_HEIGHT }));
      setTimeout(() => {
        setPosition((prev) => ({ ...prev, y: 0 }));
      }, 300);
    }

    // switch (e.key) {
    //   case "ArrowLeft":
    //     setIsLeft(true);
    //     setPosition((prev: Position) => ({
    //       ...prev,
    //       x: Math.max(-vwToPx(10), prev.x - vwToPx(MOVE_AMOUNT)),
    //     }));
    //     break;
    //   case "ArrowRight":
    //     setIsLeft(false);
    //     setPosition((prev: Position) => ({
    //       ...prev,
    //       x: Math.min(vwToPx(70), prev.x + vwToPx(MOVE_AMOUNT)),
    //     }));
    //     break;
    // }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setIsLeft(true);
        setPosition((prev: Position) => ({
          ...prev,
          // 왼쪽으로는 초기 위치에서 약간의 여유만 주기
          x: Math.max(
            -baseX + characterWidth,
            prev.x - (screenWidth * MOVE_AMOUNT) / 100
          ),
        }));
        break;
      case "ArrowRight":
        e.preventDefault();
        setIsLeft(false);
        setPosition((prev: Position) => ({
          ...prev,
          // 오른쪽으로는 화면의 80% 정도까지만 이동 가능
          x: Math.min(
            maxMoveRange - characterWidth * 2,
            prev.x + (screenWidth * MOVE_AMOUNT) / 100
          ),
        }));
        break;
    }
  }, []);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const { Engine, Render, World, Bodies, Runner } = Matter;
    const engine = Engine.create();
    engineRef.current = engine;

    const getRem = (rem: number) =>
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const getViewportSize = () => ({
      width: window.innerWidth * 0.96,
      height: window.innerHeight,
      bottomOffset: getRem(8),
    });

    const createRender = () => {
      return Render.create({
        element: sceneRef.current!,
        engine: engine,
        options: {
          width: sceneRef.current!.clientWidth,
          height: window.innerHeight,
          wireframes: false,
          background: "transparent",
        },
      });
    };

    const blockBodiesRef: Matter.Body[] = [];

    const createBlocks = () => {
      blockBodiesRef.forEach((block) => World.remove(engine.world, block));
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
        blockBodiesRef.push(blockBody);
        World.add(engine.world, blockBody);
      });

      return blockBodiesRef;
    };

    const createCharacter = () => {
      if (!myIconRef.current) return null;
      const { height, bottomOffset } = getViewportSize();
      const iconRect = myIconRef.current.getBoundingClientRect();
      const characterSize = iconRect.width;

      const iconBody = Bodies.rectangle(
        iconRect.x + characterSize / 2,
        height - bottomOffset - characterSize / 2,
        characterSize,
        characterSize,
        {
          render: {
            fillStyle: "transparent",
            visible: true,
          },
          friction: 0.05,
          restitution: 0.2,
          density: 5,
          mass: 10,
          isStatic: false,
          collisionFilter: {
            category: 0x0002,
            mask: 0xffffffff,
          },
        }
      );
      return iconBody;
    };

    const createWalls = () => {
      const { width, height, bottomOffset } = getViewportSize();

      return [
        Bodies.rectangle(width / 2, height, width, bottomOffset * 2, {
          isStatic: true,
          render: { fillStyle: "transparent" },
          collisionFilter: {
            category: 0x0001,
            mask: 0xffffffff,
          },
        }),
        // 왼쪽 벽 (더 길게)
        Bodies.rectangle(20, height / 2, 10, height, {
          isStatic: true,
          render: { fillStyle: "transparent" },
          collisionFilter: {
            category: 0x0001,
            mask: 0xffffffff,
          },
        }),
        // 오른쪽 벽 (더 길게)
        Bodies.rectangle(width + 30, height / 2, 10, height, {
          isStatic: true,
          render: { fillStyle: "transparent" },
          collisionFilter: {
            category: 0x0001,
            mask: 0xffffffff,
          },
        }),
      ];
    };

    const render = createRender();
    createBlocks();
    const character = createCharacter();
    if (character) {
      iconBodyRef.current = character;
      World.add(engine.world, character);
    }

    let walls = createWalls();
    World.add(engine.world, walls);
    let blockBodies = createBlocks();
    createCharacter();

    const handleResize = () => {
      render.canvas.width = sceneRef.current!.clientWidth;
      render.canvas.height = window.innerHeight;

      walls.forEach((wall) => World.remove(engine.world, wall));
      walls = createWalls();
      World.add(engine.world, walls);

      blockBodies.forEach((block) => World.remove(engine.world, block));
      blockBodies = createBlocks();

      if (iconBodyRef.current && myIconRef.current) {
        const { height, bottomOffset } = getViewportSize();
        const iconRect = myIconRef.current.getBoundingClientRect();
        const characterSize = iconRect.width;

        const scale =
          characterSize /
          (iconBodyRef.current.bounds.max.x - iconBodyRef.current.bounds.min.x);
        Matter.Body.scale(iconBodyRef.current, scale, scale);

        const baseX = window.innerWidth * 0.1;
        const newX = baseX + position.x;
        const newY = height - bottomOffset - characterSize / 2 + position.y;
        Matter.Body.setPosition(iconBodyRef.current, {
          x: newX,
          y: newY,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    const createStar = () => {
      if (!dropdownStarRef.current) return;

      const randomStar = stars[Math.floor(Math.random() * stars.length)];

      const starElement = document.createElement("img");
      starElement.src = randomStar.imagePath;
      starElement.style.position = "absolute";
      starElement.style.width = `${randomStar.size}px`;
      starElement.style.height = `${randomStar.size}px`;
      starElement.style.pointerEvents = "none";
      dropdownStarRef.current.appendChild(starElement);

      const star = Bodies.circle(
        Math.random() * (window.innerWidth - 100) + 50,
        -50,
        randomStar.radius,
        {
          render: {
            visible: false,
          },
          restitution: 0.6,
          friction: 0.05,
          density: 0.001,
          mass: 0.1,
          frictionAir: 0.001,
          collisionFilter: {
            category: 0x0004,
            mask: 0xffffffff,
          },
        }
      );

      if (!mobileSize) {
        Matter.Events.on(engine, "collisionStart", (event) => {
          event.pairs.forEach((pair) => {
            if (
              (pair.bodyA === star && pair.bodyB === iconBodyRef.current) ||
              (pair.bodyA === iconBodyRef.current && pair.bodyB === star)
            ) {
              Matter.Body.setVelocity(star, {
                x: star.velocity.x * 1.5,
                y: -15,
              });

              // 캐릭터의 속도는 최소화
              if (iconBodyRef.current) {
                Matter.Body.setVelocity(iconBodyRef.current, {
                  x: iconBodyRef.current.velocity.x * 0.1,
                  y: iconBodyRef.current.velocity.y * 0.1,
                });
              }

              setShowScore(true);

              setTimeout(() => {
                setShowScore(false);
                Matter.World.remove(engine.world, star);
                starElement.remove();
              }, 300);
            }
          });
        });
      }

      const updateListener = () => {
        starElement.style.left = `${star.position.x - randomStar.size / 2}px`;
        starElement.style.top = `${star.position.y - randomStar.size / 2}px`;

        if (star.position.y > window.innerHeight + randomStar.size) {
          Matter.Events.off(engine, "afterUpdate", updateListener);
          World.remove(engine.world, star);
          // 부모 노드 확인 후 제거
          if (starElement.parentNode) {
            starElement.parentNode.removeChild(starElement);
          }
        }
      };

      Matter.Events.on(engine, "afterUpdate", updateListener);
      World.add(engine.world, star);
    };

    const starInterval = setInterval(createStar, 4000);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      clearInterval(starInterval);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      window.removeEventListener("resize", handleResize);
      if (iconBodyRef.current) {
        World.remove(engine.world, iconBodyRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (myIconRef.current && iconBodyRef.current) {
      const baseX = window.innerWidth * 0.1;
      const newX = baseX + position.x;
      const newY = window.innerHeight - 120 + position.y;

      Matter.Body.setPosition(iconBodyRef.current, {
        x: newX,
        y: newY,
      });
      Matter.Body.setVelocity(iconBodyRef.current, { x: 0, y: 0 });
    }
  }, [position]);

  return (
    <Container ref={ref}>
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
            <span>송채영 {mobileSize && <br />} 포트폴리오</span>
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
          onKeyDown={mobileSize ? undefined : handleCharter}
          style={{
            outline: "none",
          }}
        >
          {moveText && (
            <div className="iconArrow">
              <img src="/pixelart/arr.png" alt="arrow" />
              <div>
                <p>move me!</p>
                <p>
                  ← → alt <small>keydown!</small>{" "}
                </p>
              </div>
            </div>
          )}
          <div
            className="iconCharter"
            ref={myIconRef}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scaleX(${
                isLeft ? -1 : 1
              }) `,
              transformOrigin: "center",
              transition: "transform 0.2s ease",
              outline: "none",
              marginLeft: "-30px",
            }}
          >
            {showScore && (
              <p
                style={{
                  transform: `scaleX(${isLeft ? -1 : 1}) `,
                }}
                className="iconCharter_score"
              >
                + 1
              </p>
            )}
            <img src="/pixelart/pixelicon.png" alt="pixelicon" />
          </div>
        </div>
        <div className="dropdownStar" ref={dropdownStarRef}></div>
      </article>

      <article className="sec1btm">
        <div className="lightGreen"></div>
        <div className="green"></div>
        <div className="brown"></div>
      </article>
    </Container>
  );
};

export default forwardRef<HTMLElement, Section01Props>(Section01);
