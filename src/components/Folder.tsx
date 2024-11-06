import React, { useEffect, useRef, useState } from "react";
// import "98.css";
import styled from "styled-components";
import { Project, Skill } from "../type";
import { myData } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import ProjectFolder from "./ProjectFolder";

const Container = styled(motion.div)<{ $zIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0; // 추가
  margin: 0 auto;
  z-index: ${({ $zIndex }) => $zIndex};
  /* transform: translate(-50%, -50%); */
  width: 75.125rem;
  /* width: 100%; */
  height: 37.5rem;
  background: #fff;
  overflow-y: auto;
  /* scroll-behavior: smooth; */
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
    inset -2px -2px grey, inset 2px 2px #fff;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .topBar {
    position: sticky;
    top: 2px;
    left: 1px;
    width: calc(100% - 4px);
    padding: 0.25rem 0.5rem;
    /* background: linear-gradient(to right, #041187, #0d7cca); */
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

  .contents {
    width: 100%;
    height: 100%;
    position: relative;
    /* width: fit-content; */
    /* margin: 0 auto; */
    /* padding: 3.75rem 4.81rem; */

    .items {
      /* width: fit-content; */
      margin: 0 auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 3.13rem 4rem;
      justify-items: center;
      padding: 3.75rem;
      /* justify-content: center; */
      .item {
        width: 18.875rem;
        /* justify-self: center; */
        /* width: fit-content; */
        cursor: pointer;
        .img {
          /* width: 100%; */
          height: 11.59094rem;
          background: #d9d9d9;
          margin-bottom: 1rem;
          img {
            width: 100%;

            height: 100%;
            object-fit: cover;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
          color: #000;
          .content_title {
            font-family: "DungGeunMo";
            font-size: 1.25rem;
            letter-spacing: -0.0625rem;
          }
          .content_desc {
            font-size: 0.75rem;
            letter-spacing: -0.0625rem;
            font-weight: 300;
            line-height: 1rem;
          }
        }
      }
    }
  }
`;

const Test = styled.div`
  width: inherit;
  height: inherit;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

interface FolderProps {
  name: string;
  data: Project[];
  zIndex: number;
  setActiveFolder: () => void;
  setBtmState: React.Dispatch<React.SetStateAction<string[]>>;
  setFolder: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: (name: string) => void;
}

const Folder = ({
  name,
  data,
  setBtmState,
  setFolder,
  zIndex,
  setActiveFolder,
  onClose,
}: FolderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // if (containerRef.current) {
    //   containerRef.current.scrollTop += e.deltaY;
    // }
  };

  // console.log(isOpen);

  const handleClick = () => {
    setActiveFolder();
  };

  const closeFolder = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (zIndex !== 999) {
      setActiveFolder();
      return;
    }

    onClose(name);
    setSelectedProjectId(null);

    // setBtmState((prev: string[]) => prev.filter((it) => it !== name));
    // setFolder((prev: string[]) => prev.filter((it) => it !== name));
    // onClose(name);
    // setSelectedProjectId(null);
  };
  // console.log(selectedProjectId);
  return (
    <>
      <Container
        className="folder"
        ref={containerRef}
        $zIndex={zIndex}
        onClick={handleClick}
        drag
        dragMomentum={false}
        initial={{
          scale: 0,
          opacity: 0,
          y: "100%", // 아래에서 시작
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: "35%", // 정중앙으로 이동
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        exit={{
          scale: 0,
          opacity: 0,
          y: "100%",
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1],
          },
        }}
      >
        <div className="topBar">
          <div className="title">{name}</div>
          <div className="xBtn" onClick={closeFolder}>
            X
          </div>
        </div>
        <div className="contents">
          <div className="items" onWheel={handleWheel}>
            {data.map((it, idx) => (
              <div
                className="item"
                key={idx}
                onDoubleClick={() => {
                  setSelectedProjectId(it.id);
                  setSelectedProjectIdx(idx);
                }}
              >
                <div className="img"></div>
                <div className="desc">
                  <h3 className="content_title">{it.title}</h3>
                  <p className="content_desc">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <Test className="test" onClick={closeFolder}> */}
          <AnimatePresence mode="wait">
            {selectedProjectIdx !== null && (
              <ProjectFolder
                data={data[selectedProjectIdx]}
                setSelectedProjectIdx={setSelectedProjectIdx}
              />
            )}
          </AnimatePresence>
          {/* </Test> */}
        </div>
      </Container>
    </>
  );
};

export default Folder;
