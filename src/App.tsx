import React, { useEffect, useRef, useState } from "react";
// import "nes.css/css/nes.min.css";
// import "98.css";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Section01 from "./sections/Section01";
import Section02 from "./sections/Section02";
import Section03 from "./sections/Section03";
import Section04 from "./sections/Section04";
import Section05 from "./sections/Section05";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DungGeunMo';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SDSamliphopangche_Outline';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
    margin: 0;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  body {
    background-color: #000;
    color: #fff !important;
    cursor: default !important;
    line-height: 1;
    font-family: "Pretendard-Regular" !important;
    font-size: 16px !important;
    /* -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    } */
  }
  .inner {
    width: 67.5rem;
    margin: 0 auto;
  }

  :root {
    --main-color: #006FFF;
    --main-bg : #000;
    --main-fontColor : #fff;
    --main-lightblue: #B2D4FF
  }

  @media (max-width: 1500px) {
    html {
      font-size: 90%;
    }
  }
  @media (max-width: 1200px) {
    html {
      font-size: 80%;
    }
  }
  @media (max-width: 768px) {
    html {
      font-size: 70%;
    }
    .inner {
      width: 100%;
      padding: 0 1rem;
    }
  }
`;

const AppContainer = styled.div`
  /* max-width: 1200px; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const TopBtn = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    /* width: 2rem;
    height: 2rem; */
    font-size: 1.2rem;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  > section {
    padding-top: 70px;
  }

  @media screen and (max-width: 768px) {
    > section {
      padding-top: 30px;
    }
  }
`;

export const mobileSizeContext = React.createContext(false);

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const [mobileSize, setMobileSize] = useState(false);

  const updateSize = () => {
    if (window.innerWidth <= 768) setMobileSize(true);
    else setMobileSize(false);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileSize(true) : setMobileSize(false);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const section1 = useRef<HTMLElement>(null);
  const section2 = useRef<HTMLElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const section4 = useRef<HTMLDivElement>(null);

  const onTop = () => {
    allSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSection1 = () => {
    section1.current?.scrollIntoView({ block: "start" });
    // section1.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onSection2 = () => {
    section2.current?.scrollIntoView({ block: "start" });
    // section2.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onMoveBox = () => {
    section2.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onSection3 = () => {
    if (section3.current) {
      // ScrollTrigger 초기화
      const st = ScrollTrigger.getById("section3");
      if (st) {
        st.scroll(0);
        st.refresh();
      }

      const container = section3.current.querySelector(
        'div[class*="Container"]'
      );
      if (container) {
        gsap.set(container, {
          x: 0,
          overwrite: true,
        });
      }

      section3.current.scrollIntoView({ block: "start" });
    }
  };

  const onSection4 = () => {
    section4.current?.scrollIntoView({ block: "start" });
  };

  const allSection = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.5,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <mobileSizeContext.Provider value={mobileSize}>
        {loading ? (
          <Loading />
        ) : (
          <AppContainer>
            <Header
              onSection1={onSection1}
              onSection2={onSection2}
              onSection3={onSection3}
              onSection4={onSection4}
            />
            <TopBtn className="nes-btn is-primary" onClick={onTop}>
              ▲
            </TopBtn>
            <Main ref={allSection}>
              <Section01 onMoveBox={onMoveBox} ref={section1} />
              <Section02 ref={section2} />
              <Section03 ref={section3} />
              <Section04 ref={section4} />
              <Section05 />
            </Main>
          </AppContainer>
        )}
      </mobileSizeContext.Provider>
    </>
  );
};

export default App;
