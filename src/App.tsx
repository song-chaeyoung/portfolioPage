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
    color: inherit;
    text-decoration: none;
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

  @media (max-width: 1200px) {
    html {
      font-size: 14px;
    }
  }
`;

const AppContainer = styled.div`
  /* max-width: 1200px; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /* -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
  > section {
    padding-top: 70px;
  }
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const section2 = useRef<HTMLElement>(null);
  const onMoveBox = () => {
    section2.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const allSection = useRef<HTMLElement>(null);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      const { deltaY } = e;
      const scrollY = window.scrollY;
      const pageHeight = window.innerHeight;

      if (scrollY >= pageHeight && scrollY < pageHeight * 2 && deltaY > 0) {
        e.preventDefault();
        window.scrollTo({
          top: pageHeight * 2,
          behavior: "smooth",
        });
      } else if (
        scrollY >= pageHeight * 2 &&
        scrollY < pageHeight * 3 &&
        deltaY < 0
      ) {
        e.preventDefault();
        window.scrollTo({
          top: pageHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    };
    const allSectionCurrent = allSection.current;
    allSectionCurrent?.addEventListener("wheel", wheelHandler);

    return () => {
      allSectionCurrent?.removeEventListener("wheel", wheelHandler);
    };
  }, [loading]);

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <AppContainer>
          <Header />
          <Main ref={allSection}>
            <Section01 onMoveBox={onMoveBox} />
            <Section02 ref={section2} />
            <Section03 />
            <Section04 />
          </Main>
        </AppContainer>
      )}
    </>
  );
};

export default App;
