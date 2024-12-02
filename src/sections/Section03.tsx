import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { myData } from "../api";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Skill } from "../type";
import ScrollItemSc3 from "../components/ScrollItemSc3";
import { mobileSizeContext } from "../App";

const MainSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/pixelart/section3_bg.svg") center/cover no-repeat;
  z-index: -1;
`;

const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: DungGeunMo;
  font-size: 5.625rem;
  letter-spacing: 0.25rem;
  white-space: nowrap;
  z-index: 0;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
  &.fixed_position {
    transform: translate(-70vw, 35vh) scale(0.4);
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    font-size: 3.5rem;
    text-align: center;
    line-height: 1.4;
    &.fixed_position {
      transform: translate(-50%, 35vh) scale(0.4);
    }
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  article {
    width: 100%;
    height: calc(100vh - 10rem);
    width: fit-content;
    position: absolute;
    .all {
      position: relative;
      /* width: 300vw; */
      width: max(300vw, 3000px);
      height: 100%;
      z-index: 10;
      li {
        /* position: relative;
        z-index: 10; */
      }
    }
    .sec3Icons {
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

const ICONS = [
  {
    image: "/pixelart/icon01.png",
    position: { left: "90%", top: "10%" },
  },
  {
    image: "/pixelart/icon02.png",
    position: { left: "85%", top: "88%" },
  },
  {
    image: "/pixelart/icon03.png",
    position: { left: "40%", top: "90%" },
  },
  {
    image: "/pixelart/icon04.png",
    position: { left: "95%", top: "65%" },
  },
  {
    image: "/pixelart/icon05.png",
    position: { left: "77%", top: "20%" },
  },
];

gsap.registerPlugin(ScrollTrigger);

const Section3 = (_: any, ref: React.ForwardedRef<HTMLDivElement>) => {
  const mobileSize = useContext(mobileSizeContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [data, setData] = useState<Skill[]>([]);

  useEffect(() => {
    try {
      console.log("data loading");
      (async () => {
        const response = await myData();
        setData(response.skills);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const width = sectionRef.current.scrollWidth;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          // end: "+=300%",
          end: () => `+=${width}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "section3",
          onLeave: () => {
            ScrollTrigger.clearScrollMemory();
          },
        },
      });

      mainTl.to(
        sectionRef.current,
        {
          translateX: -width,
          duration: 2,
          ease: "none",
        },
        "-=0.5"
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "9999",
        onEnter: () => {
          textRef.current?.classList.add("fixed_position");
        },
        onEnterBack: () => {
          textRef.current?.classList.add("fixed_position");
        },
        onLeaveBack: () => {
          textRef.current?.classList.remove("fixed_position");
        },
        onLeave: () => {
          // 추가
          textRef.current?.classList.remove("fixed_position");
        },
      });

      return () => {
        mainTl.scrollTrigger?.kill();
        mainTl.kill();
      };
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const width = sectionRef.current.scrollWidth - window.innerHeight;
      const skillItems = document.querySelectorAll(".skillItem");
      // const speed = 0.8 + index * 0.2;
      const speedOptions = [0.06, 0.1, 0.25, 0.09, 0.03, 0.09];

      skillItems.forEach((item, index) => {
        const speed = speedOptions[index % speedOptions.length];
        gsap.to(item, {
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${width}`,
            scrub: 2,
            invalidateOnRefresh: true,
          },
          x: `-=${width * speed}`,
          ease: "none",
        });
      });

      return () => {
        skillItems.forEach((_, index) => {
          ScrollTrigger.getById(`skill-${index}`)?.kill();
        });
      };
    }
  }, [data]);

  return (
    <MainSection ref={triggerRef}>
      <Background ref={ref} />
      <Text ref={textRef}>
        저는 이런 기술을 {mobileSize && <br />} 사용해봤어요
      </Text>
      <Container ref={sectionRef}>
        <article>
          <ul className="all">
            {data.map((item, idx) => (
              <ScrollItemSc3 data={item} key={idx} />
            ))}
          </ul>
          <div className="sec3Icons">
            {ICONS.map((icon, idx) => (
              <img
                src={icon.image}
                alt={`icon${idx + 1}`}
                key={idx}
                style={{
                  left: icon.position.left,
                  top: icon.position.top,
                }}
              />
            ))}
          </div>
        </article>
      </Container>
    </MainSection>
  );
};

export default forwardRef<HTMLDivElement, any>(Section3);
