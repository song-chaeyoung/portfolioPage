import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Project } from "../type";
import { motion } from "framer-motion";

const Container = styled(motion.div)<{ $zIndex: number }>`
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
  z-index: ${({ $zIndex }) => $zIndex};
  .project_topBar {
    position: fixed;
    top: 1px;
    left: 1px;
    width: calc(100% - 4px);
    padding: 0.25rem 0.5rem;
    background: linear-gradient(90deg, navy, #1084d0);
    display: flex;
    justify-content: space-between;
    font-family: "DungGeunMo";
    cursor: pointer;
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
    cursor: pointer;
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
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 0 2rem;
    .project_img {
      flex: 1;
      width: 38.375rem;
      min-width: 30rem;
      background: #d9d9d9;
      border: 1px solid #efefef;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .project_desc {
      width: 100%;
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
        gap: 0.5rem 0.75rem;
        flex-wrap: wrap;
        .tag {
          border-radius: 0.375rem;
          border: 1px solid #555;
          padding: 0.375rem 0.625rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.875rem;
          color: #333;
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
          width: 1.75rem;
          height: 1.75rem;
          cursor: pointer;
          transition: all 0.3s;
          img {
            width: 100%;
            height: 100%;
          }
          &:hover {
            transform: translateY(-0.25rem);
          }
        }
      }
      .content_desc {
        font-size: 1rem;
        line-height: 150%;
      }
    }
  }

  @media (max-width: 768px) {
    top: auto;
    width: 100%;
    height: calc(100vh - 55px);
    bottom: 0;
    margin-top: auto;
    flex-direction: column;
    flex-wrap: nowrap;
    .project_topBar {
      position: absolute;
      font-size: 1.75rem;
      .title {
        font-size: 1.75rem;
        /* padding: 0.5rem ; */
      }
    }
    .backBtn {
      left: 1rem;
    }
    .project_contents {
      flex-direction: column;
      .project_img {
        width: 90vw;
        min-width: 10rem;
      }
      .project_desc {
        width: 100%;
      }
    }
  }
`;

interface ProjectFolderProps {
  data: Project;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  zIndex: number;
}

const ProjectFolder = ({
  data,
  setSelectedProjectIdx,
  zIndex,
}: ProjectFolderProps) => {
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
      $zIndex={zIndex}
      ref={tesetRef}
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
        <div className="project_img">
          {/* <a
            href={data.links.find((it) => it.type === "website")?.link}
            target="_blank"
          >
            <img
              src={`/projectImg/project${data.id}.png`}
              alt={`project${data.id}`}
            />
          </a> */}
          <img
            src={`/projectImg/project${data.id}.png`}
            alt={`project${data.id}`}
          />
        </div>
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
            {data.links.map(
              (it) =>
                it.type === "github" && (
                  <a href={it.link} target="_blank" className="icon">
                    <img src="/pixelart/githubIcon.svg" alt="github" />
                  </a>
                )
            )}
            {data.links.map(
              (it) =>
                it.type === "figma" && (
                  <a href={it.link} target="_blank" className="icon">
                    <img src="/pixelart/figmaIcon.svg" alt="figma" />
                  </a>
                )
            )}
            {data.links.map(
              (it) =>
                it.type === "website" && (
                  <a href={it.link} target="_blank" className="icon">
                    <img src="/pixelart/siteIcon.svg" alt="website" />
                  </a>
                )
            )}
          </div>
          <p className="content_desc">{data.desc}</p>
        </div>
      </div>
    </Container>
  );
};

export default ProjectFolder;
