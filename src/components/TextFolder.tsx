import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { containerVariants } from "./Folder";

const Container = styled(motion.div)<{ zIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0; // 추가
  margin: 0 auto;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  z-index: ${(props) => props.zIndex};
  width: 75.125rem;
  height: 37.5rem;
  background: #fff;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
    inset -2px -2px grey, inset 2px 2px #fff;
  .topBar {
    position: relative;
    top: 2px;
    left: 1px;
    width: calc(100% - 4px);
    padding: 0.25rem 0.5rem;
    background: linear-gradient(90deg, navy, #1084d0);
    display: flex;
    justify-content: space-between;
    font-family: "DungGeunMo";
    z-index: 10;
    .title {
      font-size: 1.25rem;
      text-transform: capitalize;
    }
    .xBtn {
      min-height: 14px;
      min-width: 20px;
      background: silver;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff,
        inset -2px -2px grey, inset 2px 2px #dfdfdf;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      padding-bottom: 2px;
      cursor: pointer;
      &:active {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a,
          inset -2px -2px #dfdfdf, inset 2px 2px grey;
      }
    }
  }
`;

interface TextFolderProps {
  text: string;
  setBtmState: (state: string[]) => void;
  setFolder: (folder: string[]) => void;
  zIndex: number;
  setActiveFolder: (folder: string) => void;
  setTextFolderOpen: (text: string) => void;
}

const TextFolder = ({
  text,
  setBtmState,
  setFolder,
  zIndex,
  setActiveFolder,
  setTextFolderOpen,
}: TextFolderProps) => {
  const handleClick = () => {
    // setActiveFolder();
    setActiveFolder(text);
  };

  const textFolderClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTextFolderOpen(""); // 텍스트 폴더 닫기
    setActiveFolder(""); // 활성 폴더 초기화
  };

  return (
    <Container
      drag
      dragMomentum={false}
      variants={containerVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      transition={containerVariants.transition}
      zIndex={zIndex}
      onClick={handleClick}
    >
      <div className="topBar">
        <div className="title">{text}</div>
        <div className="xBtn" onClick={textFolderClose}>
          X
        </div>
      </div>
      <div className="textContent"></div>
    </Container>
  );
};

export default TextFolder;
