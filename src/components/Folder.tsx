import React, { useContext, useEffect, useRef, useState } from "react";
// import "98.css";
import styled from "styled-components";
import { Project } from "../type";
import { AnimatePresence, motion } from "framer-motion";
import ProjectFolder from "./ProjectFolder";
import { mobileSizeContext } from "../App";

const Container = styled(motion.div)<{ $zIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0; // 추가
  margin: 0 auto;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 75.125rem;
  height: 37.5rem;
  /* width: 100%; */
  background: #fff;
  /* overflow-y: auto; */
  /* scroll-behavior: smooth; */
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
    inset -2px -2px grey, inset 2px 2px #fff;
  /* -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */

  .topBar {
    position: sticky;
    top: 1px;
    /* top: 0; */
    left: 1px;
    width: calc(100% - 4px);
    padding: 0.25rem 0.5rem;
    background: linear-gradient(90deg, navy, #1084d0);
    display: flex;
    justify-content: space-between;
    font-family: "DungGeunMo";
    z-index: 10;
    /* border-top: 4px solid #fff; */
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
    width: 99.5%;
    margin: 0 auto;
    height: calc(100% - 1.9rem);
    position: relative;
    overflow-y: scroll;

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
        transition: all 0.3s;
        cursor: pointer;
        .img {
          width: 100%;
          /* width: 18.875rem; */
          height: 11.5rem;
          background: #d9d9d9;
          margin-bottom: 1rem;
          border: 1px solid #efefef;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: -moz-crisp-edges;
            image-rendering: -o-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            transform: translateZ(0);
            backface-visibility: hidden;
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
            font-size: 1.5rem;
            letter-spacing: -0.0625rem;
          }
          .content_desc {
            font-size: 0.95rem;
            letter-spacing: -0.0625rem;
            font-weight: 300;
            line-height: 1rem;
            cursor: pointer;
            p {
              width: fit-content;
              color: #666;
              margin: 0 auto;
              padding-bottom: 0.125rem;
              transition: all 0.3s;
              border-bottom: 1px solid transparent;
              &:hover {
                border-bottom: 1px solid #666;
              }
            }
          }
        }
        &:hover {
          scale: 1.1;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 55px);
    bottom: 0;
    margin-top: auto;
    flex-direction: column;
    flex-wrap: nowrap;
    .topBar {
      .title {
        font-size: 1.75rem;
      }
    }

    .contents {
      .items {
        margin: 3rem auto 0;
        align-items: center;
        padding: 1rem;
        padding: 0;
        /* margin: 0 auto; */
        .item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img {
            height: 100%;
            width: 90vw;
          }
          .desc {
            .content_title {
              font-size: 1.75rem;
            }
          }
        }
      }
    }
  }
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

export const containerVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    y: "100%",
  },
  visible: {
    scale: 1,
    opacity: 1,
    // y: "35%",
    y: "-50%",
    top: "50%",
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
};

export const containerVariantsMobile = {
  initial: {
    scale: 0,
    opacity: 0,
    y: "100%",
  },
  visible: {
    scale: 1,
    opacity: 1,
    // y: "35%",
    // y: "-50%",
    // top: "50%",
    y: "0%",
    bottom: 0,
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
};

const Folder = ({
  name,
  data,
  zIndex,
  setActiveFolder,
  onClose,
}: FolderProps) => {
  const mobileSize = useContext(mobileSizeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(
    null
  );

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
    // setSelectedProjectId(null);
  };

  useEffect(() => {
    if (selectedProjectIdx !== null && containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [selectedProjectIdx]);

  return (
    <>
      <Container
        className="folder"
        ref={containerRef}
        $zIndex={zIndex}
        onClick={handleClick}
        drag={mobileSize ? false : true}
        dragMomentum={false}
        variants={mobileSize ? containerVariantsMobile : containerVariants}
        initial="initial"
        animate="visible"
        exit="exit"
        transition={containerVariants.transition}
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
                onClick={() => {
                  setSelectedProjectIdx(idx);
                }}
              >
                <div className="img">
                  <img
                    src={`/projectImg/project${it.id}.png`}
                    alt={`project${it.id}`}
                  />
                </div>
                <div className="desc">
                  <h3 className="content_title">{it.title}</h3>
                  <a
                    className="content_desc"
                    href={
                      it.links.find((link) => link.type === "website")?.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>
                      {it.links.find((link) => link.type === "website")?.link}
                    </p>
                  </a>
                  {/* <p className="content_desc">{it.desc}</p> */}
                </div>
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {selectedProjectIdx !== null && (
              <ProjectFolder
                data={data[selectedProjectIdx]}
                setSelectedProjectIdx={setSelectedProjectIdx}
                zIndex={zIndex}
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
