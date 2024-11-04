import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useTextEffect from "../Hooks/useTextEffect";

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "DungGeunMo";
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://i.ibb.co/x3TCktM/645cbb8ec449398255b76326-noise.gif");
    background-position: 0 0;
    background-size: auto;
    pointer-events: none;
    opacity: 0.1;
    transition: opacity 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    visibility: visible;
  }
  .square {
    border: 5px solid #fff;
    position: relative;
  }
  .square_top {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
    .title_left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0 10px;
      img {
        width: 1.875rem;
        height: 1.875rem;
        margin-bottom: 0.375rem;
      }
      p {
        color: var(--main-color);
        letter-spacing: -0.1rem;
        font-size: 1.375rem;
      }
    }
    .title_right {
      display: flex;
      gap: 0.625rem;
      span {
        i {
          /* width: 30px;
          height: 30px; */
        }
      }
    }
  }
  .square_center {
    width: 100%;
    height: 28.125rem;
    min-height: 28.125rem;
    border-bottom: none;
    display: flex;
    .square_center_left {
      flex: 1;
      padding: 0.625rem 0;
      border-right: 5px solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      gap: 0;
      /* padding-top: 100px; */
      .circle {
        position: relative;
        width: 20rem;
        height: 20rem;
        /* border-radius: 50%; */
        background: var(--main-color);
        border: 10px solid #fff;
        box-shadow: 10px 10px 0 #666;
        .mainImg {
          width: 22.5rem;
          position: absolute;
          top: -12.4%;
          /* top: -23.5%; */
          left: 50%;
          transform: translateX(-50%);
        }
        .pixelicon {
          width: 5rem;
          position: absolute;
          top: 14%;
          left: 54%;
        }
        .heart1,
        .heart2 {
          position: absolute;
          width: 3.125rem;
          &.heart1 {
            transform: rotate(-20deg);
            top: -10%;
            left: 8%;
          }
          &.heart2 {
            transform: rotate(20deg);
            bottom: 0%;
            right: -10%;
          }
        }
      }
      .imgtext {
        color: var(--main-lightblue);
        font-size: 2.5rem;
        letter-spacing: 0.12rem;
        position: relative;
        z-index: 3;
        &::after {
          width: 100%;
          content: "HELLO WORLD";
          position: absolute;
          color: #fff;
          top: 0;
          left: 4px;
          z-index: -1;
        }
      }
    }
    .square_center_right {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* align-items: center; */
      gap: 2.375rem;
      padding-left: 2.375rem;
      .main_title {
        display: flex;
        flex-direction: column;
        gap: 1.875rem;
        width: fit-content;
        p:nth-child(1) {
          letter-spacing: -0.12rem;
          font-size: 2.5rem;
          transition: all 0.2s ease;
          display: flex;
          gap: 0.625rem;
          span {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
          &:hover {
            span {
              transform: rotate(30deg);
            }
          }
        }
        p:nth-child(2),
        p:nth-child(3) {
          font-size: 3.125rem;
          letter-spacing: -0.12rem;
          span {
            color: var(--main-color);
            position: relative;
            /* margin-right: 10px; */
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
        }
      }
      .main_btn {
        position: relative;
        display: flex;
        align-items: center;
        background: #fff;
        border: 2px solid #666;
        width: 13.75rem;
        height: 3.75rem;
        cursor: pointer;
        transform: translate(0, 0);
        transition: all 0.2s ease;
        box-shadow: 6px 6px 0 #333;
        /* z-index: 1; */
        /* z-index: 0; */
        > p {
          flex: 14;
          color: #000;
          text-align: center;
          font-family: "DungGeunMo";
          font-size: 1.875rem;
          width: 100%;
          letter-spacing: -0.06rem;
        }
        > div {
          flex: 6;
          width: 3.75rem;
          height: 100%;
          background: var(--main-color);
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 3rem;
            transform: rotate(-90deg);
          }
        }
        &:hover {
          transform: translate(4px, 4px);
        }
      }
      .clickiconConatiner {
        position: absolute;
        bottom: 2.5rem;
        right: 2.5rem;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        .icontext {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-top: 0.625rem;
          p {
            font-size: 1.5rem;
          }
          img {
            height: 1.875rem;
            transform: rotate(-90deg);
          }
        }
        .clickIcon {
          width: 4.375rem;
          height: 4.375rem;
          cursor: pointer;
          position: relative;
          z-index: 100;
          img {
            width: 100%;
            height: 100%;
          }
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12.5rem;
            height: 12.5rem;
            background: var(--main-color);
            border-radius: 50%;
            display: none;
            /* z-index: -1; */
          }
          &:hover {
            &::before {
              display: block;
            }
          }
        }
      }
    }
  }
  .square_btm {
    width: 100%;
    height: 5.5rem;
    overflow: hidden;
    .textcontainer {
      height: 100%;
      white-space: nowrap;
      display: flex;
      /* justify-content: center; */
      align-items: center;
      gap: 3.125rem;
      animation: flowText 10s linear infinite;
      > div {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
          height: 2.25rem;
        }
        p {
          font-size: 2.125rem;
          color: var(--main-color);
          letter-spacing: 0.08rem;
        }
      }
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
  @keyframes flowText {
    0% {
      transform: translateX(5%);
    }
    100% {
      transform: translateX(-89%);
    }
  }
`;

interface onMoveBox {
  onMoveBox: () => void;
}

const Section01 = ({ onMoveBox }: onMoveBox) => {
  const textArray = ["프론트엔드", "항상 노력하는", "REACT", "공부하는"];
  const displayText = useTextEffect({ texts: textArray });

  useEffect(() => {}, []);

  return (
    <Container>
      <div className="bg"></div>
      <div className="inner">
        <div className="square_top square">
          <div className="title_left">
            {/* <img src="/pixelart/pixelicon.png" alt="pixelicon" /> */}
            <p>프론트엔드 송채영 포트폴리오</p>
          </div>
          <div className="title_right">
            <span>
              <i className="nes-icon github is-small"></i>
            </span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="square_center square">
          <div className="square_center_left">
            <div className="circle">
              <img
                className="mainImg"
                src="/pixelart/mainImg.png"
                alt="mainImg"
              />
              <img
                className="pixelicon"
                src="/pixelart/pixelicon.png"
                alt="pixelicon"
              />
              {/* <img
                className="heart1"
                src="/pixelart/blueheart.gif"
                alt="blueheart"
              />
              <img
                className="heart2"
                src="/pixelart/blueheart.gif"
                alt="blueheart"
              /> */}
            </div>
            <div className="imgtext">
              <p>HELLO WORLD</p>
            </div>
          </div>
          <div className="square_center_right">
            <div className="main_title">
              <p>
                안녕하세요 <span>👋</span>
              </p>
              <p>
                <span>{displayText}</span> 개발자
              </p>
              <p>송채영입니다.</p>
            </div>
            <div className="main_btn" onClick={() => onMoveBox()}>
              <p>GAME START</p>
              <div>
                <img src="/pixelart/arr.png" alt="arrow" />
              </div>
            </div>
            <div className="clickiconConatiner">
              <div className="icontext">
                <p>Click!</p>
                <img src="/pixelart/arr.png" alt="arrow" />
              </div>
              <div className="clickIcon">
                <img src="/pixelart/meicon.png" alt="meicon " />
              </div>
            </div>
          </div>
        </div>
        <div className="square_btm square">
          <div className="textcontainer">
            <div>
              <img src="/pixelart/htmlicon.png" alt="htmlicon"></img>
              <p>HTML</p>
            </div>
            <div>
              <img src="/pixelart/cssicon.png" alt="cssicon"></img>
              <p>CSS</p>
            </div>
            <div>
              <img src="/pixelart/jsicon.png" alt="jsicon"></img>
              <p>JavaScript</p>
            </div>
            <div>
              <img src="/pixelart/reacticon.png" alt="reacticon"></img>
              <p>React</p>
            </div>
            <div>
              <img src="/pixelart/tsicon.png" alt="htmlicon"></img>
              <p>TypeScript</p>
            </div>
            <div>
              <img src="/pixelart/htmlicon.png" alt="htmlicon"></img>
              <p>HTML</p>
            </div>
            <div>
              <img src="/pixelart/cssicon.png" alt="cssicon"></img>
              <p>CSS</p>
            </div>
            <div>
              <img src="/pixelart/jsicon.png" alt="jsicon"></img>
              <p>JavaScript</p>
            </div>
            <div>
              <img src="/pixelart/reacticon.png" alt="reacticon"></img>
              <p>React</p>
            </div>
            <div>
              <img src="/pixelart/tsicon.png" alt="htmlicon"></img>
              <p>TypeScript</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Section01;
