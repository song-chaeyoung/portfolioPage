import styled from "styled-components";
import Folder from "./Folder";
import { useEffect, useState } from "react";
import { myData } from "../api";
import { Project, Skill } from "../type";

const Container = styled.div`
  width: 100%;
  height: 100%;

  /* position: relative; */
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .icon_container {
    font-family: "DungGeunMo";
    margin: 8.8125rem 4.25rem 0;
    display: flex;
    justify-content: space-between;
    .icons_project {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      > img {
        width: 3.75rem;
        height: 3.75rem;
        &.text {
          width: 2.75rem;
          height: 2.75rem;
          margin-bottom: 0.625rem;
        }
      }
      p {
        font-size: 1.25rem;
        color: #000;
        letter-spacing: -0.0625rem;
      }
    }
  }
  .btmBar {
    font-family: "DungGeunMo";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    background: #b5b5b5;
    display: flex;
    align-items: center;
    gap: 1.75rem;
    padding: 0 1.75rem;
    .power {
      background: silver;
      box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
        inset -3px -3px grey, inset 3px 3px #dfdfdf;
      flex: 1;
      position: relative;
      width: 5.6875rem;
      /* height: 1.75rem; */
      padding: 0.375rem 1rem;
      cursor: pointer;
      &:active {
        box-shadow: inset -2px -2px #fff, inset 2px 2px #0a0a0a,
          inset -3px -3px #dfdfdf, inset 3px 3px grey;
      }
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .powerBtn {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;

        > img {
          width: 1.375rem;
          height: 1.25rem;
        }
        > p {
          font-size: 1.25rem;
          letter-spacing: -0.0625rem;
        }
      }
    }
    .state {
      flex: 14;
    }
  }
`;

// interface SetIsOpen {

// }

const ComputerDisplaySc4 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const response = await myData();
      setData(response.projectItems);
    })();
  }, []);

  const folderOpen = (name: string) => {
    if (name === "all") {
      setSelected(data);
    } else {
      const filteredData = data.filter((item) => item.category === name);
      setSelected(filteredData);
    }

    setIsOpen(true);
  };

  return (
    <>
      <Container>
        <img src="/pixelart/bg.jpg" alt="bg" />
        <div className="icon_container">
          <div className="icons_project">
            <div className="icon" onClick={() => folderOpen("all")}>
              <img src="/pixelart/documents.png" alt="documents" />
              <p>ALL</p>
            </div>
            <div className="icon" onClick={() => folderOpen("javascript")}>
              <img src="/pixelart/documents.png" alt="documents" />
              <p>JavaScript</p>
            </div>
            <div className="icon" onClick={() => folderOpen("react")}>
              <img src="/pixelart/documents.png" alt="documents" />
              <p>React</p>
            </div>
            <div className="icon" onClick={() => folderOpen("typescript")}>
              <img src="/pixelart/documents.png" alt="documents" />
              <p>TypeScript</p>
            </div>
          </div>
          <div className="icons_contact">
            <div className="icon">
              <img className="text" src="/pixelart/text.png" alt="text" />
              <p>CONTACT</p>
            </div>
          </div>
        </div>
        <div className="btmBar">
          <div className="power">
            {/* <img src="/pixelart/power.jpg" alt="power" /> */}
            <div className="powerBtn">
              <img src="/pixelart/window-logo.png" alt="window-logo" />
              <p>Start</p>
            </div>
          </div>
          <div className="state"></div>
        </div>
        {/* <Folder /> */}
        {isOpen && selected.length > 0 && (
          <Folder setIsOpen={setIsOpen} data={selected} />
        )}
      </Container>
    </>
  );
};

export default ComputerDisplaySc4;
