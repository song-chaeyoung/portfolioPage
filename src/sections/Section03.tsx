import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { myData } from "../api";
// import ScrollTrigger from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Skill } from "../type";
import ScrollItemSc3 from "../components/ScrollItemSc3";
import Lenis from "lenis";

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
  position: fixed;
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
    /* top: auto;
    bottom: 5%;
    left: -10%;
    transform: none;
    scale: 0.4;
    opacity: 0.8; */
    transform: translate(-60vw, 35vh) scale(0.4);
    opacity: 0.8;
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
      width: 300vw;
      height: 100%;
      > li {
      }
    }
  }
`;

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLLIElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [data, setData] = useState<Skill[]>([]);

  useEffect(() => {
    (async () => {
      const response = await myData();
      setData(response.skills);
    })();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.5,
    });

    if (sectionRef.current) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      const width = sectionRef.current.scrollWidth - window.innerHeight;

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
          onEnter: () => {
            ScrollTrigger.create({
              trigger: textRef.current,
              start: "top 40%",
              onUpdate: (self) => {
                if (self.direction === 1) {
                  textRef.current?.classList.add("fixed_position");
                } else if (self.direction === -1) {
                  textRef.current?.classList.remove("fixed_position");
                }
              },
            });
          },
          // onLeave: () => {
          //   // ScrollTrigger.create({
          //   //   trigger: triggerRef.current,
          //   //   start: "bottom bottom",
          //   //   // end: "+=100vh",
          //   //   pin: true,
          //   //   pinSpacing: false,
          //   //   markers: true,
          //   // });
          // },
          // onLeave: () => {
          //   // Section3가 고정된 상태로 유지
          //   gsap.to(triggerRef.current, {
          //     // y: "0%",
          //     duration: 1,
          //     ease: "power2.inOut",
          //   });
          // },
          // onEnterBack: () => {
          //   // Section3가 고정된 상태로 유지
          //   gsap.to(triggerRef.current, {
          //     // y: "0%",
          //     duration: 1,
          //     ease: "power2.inOut",
          //   });
          // },
        },
      });

      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: triggerRef.current,
      //     start: "top top",
      //     end: "+=300%",
      //     scrub: 1,
      //     pin: true,
      //     pinSpacing: true,
      //     anticipatePin: 1,
      //     onEnter: () => {
      //       ScrollTrigger.create({
      //         trigger: textRef.current,
      //         start: "top 40%",
      //         onUpdate: (self) => {
      //           if (self.direction === 1) {
      //             textRef.current?.classList.add("fixed_position");
      //           } else if (self.direction === -1) {
      //             textRef.current?.classList.remove("fixed_position");
      //           }
      //         },
      //         markers: true,
      //       });
      //     },
      //   },
      // });

      mainTl.to(
        sectionRef.current,
        {
          translateX: -width,
          duration: 2,
        },
        "-=0.5"
      );

      const skillItems = document.querySelectorAll(".skillItem");
      skillItems.forEach((item, index) => {
        const speedOption = [0.5, 0.8, 1.1, 1.4, 1.7];
        // const speed = speedOption[index % speedOption.length];
        const speed = 0.8 + index * 0.2;
        // const speed = 0.5 + Math.random();
        mainTl.to(
          item,
          {
            x: `-=${width * speed}`,
            duration: 2,
            ease: "none",
          },
          0
        );
      });

      // const transitionTl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: triggerRef.current,
      //     start: "bottom bottom",
      //     // end: "bottom+=300%",
      //     scrub: 1,
      //     pin: true,
      //     pinSpacing: false,
      //     enabled: false,
      //     markers: true,
      //   } as ScrollTrigger.Vars,
      // });

      return () => {
        lenis.destroy();
        mainTl.scrollTrigger?.kill();
        mainTl.kill();
        // transitionTl.scrollTrigger?.kill();
        // transitionTl.kill();
      };
    }
  }, []);

  return (
    <MainSection ref={triggerRef}>
      <Background />
      <Text ref={textRef}>저는 이런걸 좀 합니다</Text>
      <Container ref={sectionRef}>
        <article>
          <ul className="all">
            {/* {data.map((item: Skill, idx: number) => (
              <li
                key={idx}
                className="skillItem"
                ref={boxRef}
                data-x={item.x}
                data-y={item.y}
                // style={{ left: `${item.x}%`, top: `${item.y}%` }}
                style={{ position: "absolute", left: "20%", top: "20%" }}
              >
                <img src="/pixelart/pixelicon_sit.png" alt="pixelicon" />
                <ul>
                  <li className="title">{item.title}</li>
                  {item.items.map((it: SkillItem, idx: number) => (
                    <li key={idx}>
                      <h3>{it.name}</h3>
                      <p>{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))} */}
            {data.map((item, idx) => (
              <ScrollItemSc3 data={item} key={idx} />
            ))}
          </ul>
        </article>
      </Container>
    </MainSection>
  );
};

export default Section3;
