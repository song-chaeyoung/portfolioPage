import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Project } from "../type";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  min-height: inherit;
  background: #fff;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
    inset -2px -2px grey, inset 2px 2px #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* pointer-events: none; */
  /* z-index: 1000 !important; */

  .project_topBar {
    position: fixed;
    top: 2px;
    left: 1px;
    width: calc(100% - 4px);
    padding: 0.25rem 0.5rem;
    background: linear-gradient(90deg, navy, #1084d0);
    display: flex;
    justify-content: space-between;
    font-family: "DungGeunMo";
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
  .backBtn {
    position: absolute;
    top: 4rem;
    left: 2rem;
    padding: 0.6rem 0.5rem;
    transform: rotate(180deg);
    border: 2px solid #666;
    border-radius: 50%;
    transition: all 0.3s;
    img {
      width: 1.75rem;
      /* width: 100%; */
    }
    &:hover {
      transform: rotate(180deg) translateX(0.25rem);
      opacity: 0.75;
    }
  }

  .project_contents {
    height: fit-content;
    display: flex;
    /* justify-content: center; */
    /* padding: 3rem 1.75rem; */
    align-items: center;
    gap: 3rem;
    /* margin: auto 0; */
    .project_img {
      flex: 1;
      width: 34.375rem;
      /* width: 100%; */
      height: 21.25rem;
      background: #d9d9d9;
      /* height: 100%; */
    }
    .project_desc {
      flex: 1;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1.25rem;
      .title {
        font-size: 2.75rem;
        font-family: "DungGeunMo";
        text-transform: capitalize;
        letter-spacing: -0.0625rem;
      }
      .tags {
        display: flex;
        gap: 0.75rem;
        flex-wrap: nowrap;
        .tag {
          border-radius: 0.375rem;
          border: 1px solid #555;
          padding: 0.375rem 0.625rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.875rem;
          color: #555;
          letter-spacing: -0.0625rem;
          white-space: nowrap;
        }
      }
      .line {
        width: 100%;
        height: 0.0625rem;
        background: #999;
      }
      .icons {
        display: flex;
        gap: 1rem;
        .icon {
          width: 1.875rem;
          height: 1.875rem;
          background: #999;
        }
      }
      .content_desc {
        font-size: 0.875rem;
        line-height: 150%;
      }
    }
  }
`;

interface ProjectFolderProps {
  data: Project;
  // setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  // isOpen: boolean;
}

const ProjectFolder = ({ data, setSelectedProjectIdx }: ProjectFolderProps) => {
  const tesetRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProjectIdx(null);
  };

  useEffect(() => {
    // const handleWheel = (e: WheelEvent) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // };

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      // tesetRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // useEffect(() => {
  //   const preventScroll = (e: WheelEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   };

  //   const folderElement = document.querySelector<HTMLDivElement>(".folder");
  //   if (folderElement) {
  //     folderElement.scrollTo({ top: 0 });
  //     folderElement.style.overflowY = "hidden";
  //     folderElement.addEventListener("wheel", preventScroll, {
  //       passive: false,
  //     });
  //   }

  //   return () => {
  //     const folderElement = document.querySelector<HTMLDivElement>(".folder");
  //     if (folderElement) {
  //       folderElement.style.overflowY = "auto";
  //       folderElement.removeEventListener("wheel", preventScroll);
  //     }
  //   };
  // }, []);

  return (
    <Container
      ref={tesetRef}
      // onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
      //   if (!isOpen) {
      //     e.stopPropagation();
      //     console.log("wheel");
      //   }
      // }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="project_topBar">
        <div className="title">{data.title}</div>
        <div className="xBtn" onClick={handleClose}>
          X
        </div>
      </div>
      <div className="backBtn" onClick={handleClose}>
        <img src="/pixelart/arr_b.png" alt="back" />
      </div>
      <div className="project_contents">
        <div className="project_img"></div>
        <div className="project_desc">
          <h1 className="title">{data.title}</h1>
          <div className="tags">
            {data.skills.map((it, idx) => (
              <span key={idx} className="tag">
                {it}
              </span>
            ))}
          </div>
          <div className="line"></div>
          <div className="icons">
            <div className="icon"></div>
            <div className="icon"></div>
            <div className="icon"></div>
          </div>
          <p className="content_desc">{data.desc}</p>
        </div>
      </div>
    </Container>
  );
};

export default ProjectFolder;
