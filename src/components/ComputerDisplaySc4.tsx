import styled from "styled-components";
import Folder from "./Folder";
import { useEffect, useState } from "react";
import { myData } from "../api";
import { Project } from "../type";
import { AnimatePresence } from "framer-motion";
const Container = styled.div`
  width: 100%;
  height: 100%;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
    gap: 3rem;
    padding: 0 1.75rem;
    .power {
      /* flex: 1; */
      background: silver;
      box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
        inset -3px -3px grey, inset 3px 3px #dfdfdf;
      position: relative;
      /* width: 5.6875rem; */
      /* height: 1.75rem; */
      padding: 0.375rem 1.5rem;
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
      /* flex: 14; */
      display: flex;
      gap: 0.25rem;
      .stateBtn {
        background: silver;
        padding: 0.375rem 2.5rem;
        background: silver;
        box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
          inset -3px -3px grey, inset 3px 3px #dfdfdf;
        > p {
          font-size: 1.25rem;
          letter-spacing: -0.0625rem;
          text-transform: capitalize;
        }
        cursor: pointer;
        &:active {
          box-shadow: inset -2px -2px #fff, inset 2px 2px #0a0a0a,
            inset -3px -3px #dfdfdf, inset 3px 3px grey;
        }
        &.active {
          box-shadow: inset -2px -2px #fff, inset 2px 2px #0a0a0a,
            inset -3px -3px #dfdfdf, inset 3px 3px grey;
        }
      }
    }
  }
`;

// interface SetIsOpen {

// }

const ComputerDisplaySc4 = () => {
  const [data, setData] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Record<string, Project[]>>({});
  const [btmState, setBtmState] = useState<string[]>([]);
  const [folder, setFolder] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("");
  const [activeState, setActiveState] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await myData();
      setData(response.projectItems);
    })();
  }, []);

  const setActive = (folderName: string) => {
    setActiveFolder(folderName);
    setActiveState(folderName);
  };

  const handleFolderClose = (name: string) => {
    setBtmState((prev) => prev.filter((it) => it !== name));
    setFolder((prev) => prev.filter((it) => it !== name));
  };

  const folderOpen = (name: string) => {
    if (btmState.includes(name) || activeFolder === name) {
      setActive(name);
      return;
    }

    if (name === "all") {
      setSelected((prev) => ({ ...prev, [name]: data }));
      setBtmState((prev) => [...prev, name]);
      setFolder((prev) => [...prev, name]);
      setActive(name);
    } else {
      const filteredData = data.filter((item) => item.category === name);
      setSelected((prev) => ({ ...prev, [name]: filteredData }));
      setBtmState((prev) => [...prev, name]);
      setFolder((prev) => [...prev, name]);
      setActive(name);
    }
  };

  const stateClick = (name: string) => {
    if (!btmState.includes(name)) return;
    setActive(name);
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
            <div className="powerBtn">
              <img src="/pixelart/window-logo.png" alt="window-logo" />
              <p>Start</p>
            </div>
          </div>
          <div className="state">
            {btmState.length > 0 &&
              btmState.map((it, idx) => (
                <div
                  key={idx}
                  className={
                    activeState === it ? "stateBtn active" : "stateBtn"
                  }
                  onClick={() => stateClick(it)}
                >
                  <p>{it}</p>
                </div>
              ))}
          </div>
        </div>
        <AnimatePresence>
          {Object.keys(selected).length > 0 &&
            folder.length > 0 &&
            folder.map((it, idx) => (
              <Folder
                key={idx}
                name={it}
                data={selected[it]}
                setBtmState={setBtmState}
                setFolder={setFolder}
                zIndex={activeFolder === it ? 999 : 1}
                setActiveFolder={() => setActive(it)}
                onClose={handleFolderClose}
              />
            ))}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default ComputerDisplaySc4;
