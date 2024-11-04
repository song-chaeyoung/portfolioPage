import React, { useEffect, useRef, useState } from "react";
// import "98.css";
import styled from "styled-components";
import { Project, Skill } from "../type";
import { myData } from "../api";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75.125rem;
  /* width: 100%; */
  height: 37.5rem;
  margin: 0 auto;
  background: #fff;
  overflow-y: auto;
  scroll-behavior: smooth;
  /* box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf,
    inset 2px 2px #0a0a0a; */
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .topBar {
    position: sticky;
    top: 0;
    width: 100%;
    padding: 0.25rem 0.5rem;
    background: linear-gradient(to right, #041187, #0d7cca);
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

  .contents {
    /* width: fit-content; */
    margin: 0 auto;
    /* padding: 3.75rem 4.81rem; */
    padding: 3.75rem;
    .items {
      /* width: fit-content; */
      margin: 0 auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 3.13rem 4rem;
      justify-items: center;
      /* justify-content: center; */
      .item {
        width: 18.875rem;
        /* justify-self: center; */
        /* width: fit-content; */
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

interface FolderProps {
  data: Project[];
  setIsOpen: (isOpen: boolean) => void;
}

const Folder = ({ data, setIsOpen }: FolderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(data);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.scrollTop += e.deltaY;
    }
  };
  return (
    <Container ref={containerRef} onWheel={handleWheel}>
      <div className="topBar">
        <div className="title">{data[0].category}</div>
        <div className="xBtn" onClick={() => setIsOpen(false)}>
          X
        </div>
      </div>
      <div className="contents">
        <div className="items">
          {data.map((it) => (
            <div className="item" key={it.id}>
              <div className="img"></div>
              <div className="desc">
                <h3 className="content_title">{it.title}</h3>
                <p className="content_desc">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="title-bar topBar">
        <div className="title-bar-text">ALL</div>
        <div className="title-bar-controls">
          <button aria-label="Close"></button>
        </div>
      </div> */}
    </Container>
  );
};

export default Folder;
