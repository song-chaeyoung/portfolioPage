import "nes.css/css/nes.min.css";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Container = styled(motion.div)`
  background: #212429;
  color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  p {
    font-size: 2.5rem;
    font-family: "DungGeunMo";
    line-height: -0.1rem;
    margin-bottom: 0.5rem;
  }
  .loading_container {
    /* width: 580px; */
    width: 36rem;
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 4px solid #fff;
    border-radius: 10px;
    padding: 0 10px;
    span {
      width: 2.5rem;
      height: 2.5rem;
      background: var(--main-color);
      visibility: hidden;
      opacity: 0;
      animation: showSquare 1s ease-in-out forwards;
    }
    span:nth-child(1) {
      animation-delay: 0s;
    }
    span:nth-child(2) {
      animation-delay: 0.3s;
    }
    span:nth-child(3) {
      animation-delay: 0.6s;
    }
    span:nth-child(4) {
      animation-delay: 0.9s;
    }
    span:nth-child(5) {
      animation-delay: 1.2s;
    }
    span:nth-child(6) {
      animation-delay: 1.5s;
    }
    span:nth-child(7) {
      animation-delay: 1.8s;
    }
    span:nth-child(8) {
      animation-delay: 2.1s;
    }
    span:nth-child(9) {
      animation-delay: 2.4s;
    }
    span:nth-child(10) {
      animation-delay: 2.7s;
    }
    span:nth-child(11) {
      animation-delay: 3s;
    }
    span:nth-child(12) {
      animation-delay: 3.3s;
    }
    span:nth-child(13) {
      animation-delay: 3.6s;
    }
    span:nth-child(14) {
      animation-delay: 3.9s;
    }
  }

  @keyframes loading {
    0% {
      display: none;
    }
    100% {
      display: block;
    }
  }
  @keyframes showSquare {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    1% {
      visibility: visible;
      opacity: 1;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Loading = () => {
  return (
    <AnimatePresence>
      <Container
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{
          scaleY: 0,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            transformOrigin: "top", //위에서 효과가 시작됩니다.
          },
        }}
      >
        <p>Loading...</p>
        <div className="nes-container is-rounded is-dark loading_container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Container>
    </AnimatePresence>
  );
};

export default Loading;
