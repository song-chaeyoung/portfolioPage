import styled from "styled-components";
import Folder from "./Folder";
import { useEffect, useState } from "react";
import { myData } from "../api";
import { Project } from "../type";
import { AnimatePresence } from "framer-motion";
import TextFolder from "./TextFolder";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 10; */
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
    padding: 8.8125rem 4.25rem 0;
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
    height: 2.25rem;
    /* height: fit-content; */
    background: #b5b5b5;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 0 1.75rem;
    .power {
      flex: 1;
      background: silver;
      box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
        inset -3px -3px grey, inset 3px 3px #dfdfdf;
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
      .powerlist {
        position: absolute;
        left: 1.75rem;
        bottom: 2.25rem;
        background: silver;
        box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
          inset -3px -3px grey, inset 3px 3px #dfdfdf;
        padding: 0.15rem;
        li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 15rem;
          padding: 0.25rem;
          color: #000;
          &:first-child {
            border-bottom: 2px solid #999;
            /* padding: 0.25rem 0; */
            /* margin: 0 0.25rem; */
            > img {
              width: 2.25rem;
            }
          }
          img {
            width: 2.5rem;
          }
          &:hover {
            background: var(--main-color);
            color: #fff;
          }
        }
      }
    }
    .state {
      flex: 100;
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
    .time {
      flex: 1;
      background: silver;
      box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff,
        inset -3px -3px grey, inset 3px 3px #dfdfdf;
      padding: 0.375rem 1rem;
      font-size: 1.25rem;
      color: #000;
    }
  }

  @media (max-width: 768px) {
    display: flex; // Flexbox 사용
    flex-direction: column;
    .icon_container {
      padding: 8rem 1rem 0;
    }
    .btmBar {
      display: none;
    }
  }
`;

// interface SetIsOpen {

// }

const ComputerDisplaySc4 = () => {
  const [data, setData] = useState<Project[]>([]);
  const [textFolderOpen, setTextFolderOpen] = useState<string>("");
  const [selected, setSelected] = useState<Record<string, Project[]>>({});
  const [btmState, setBtmState] = useState<string[]>([]);
  const [folder, setFolder] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("");
  const [activeState, setActiveState] = useState<string>("");
  const [now, setNow] = useState<string>("");
  const [powerList, setPowerList] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await myData();
      setData(response.projectItems);
    })();

    const updateTime = () => {
      const today = new Date();
      const hours =
        today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
      const minutes =
        today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
      const nowTime = `${hours}:${minutes}`;
      setNow(nowTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const setActive = (folderName: string) => {
    setActiveFolder(folderName);
    setActiveState(folderName);
  };

  const handleFolderClose = (name: string) => {
    setBtmState((prev) => prev.filter((it) => it !== name));
    setFolder((prev) => prev.filter((it) => it !== name));
    setActiveFolder("");
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

  const textFolderOpenEvent = (name: string) => {
    if (btmState.includes(name) || activeFolder === name) {
      setActive(name);
      return;
    }
    setBtmState((prev) => [...prev, name]);
    setTextFolderOpen(name);
    setActive(name);
  };

  const stateClick = (name: string) => {
    if (!btmState.includes(name)) return;
    setActive(name);
  };

  return (
    <>
      <Container onClick={() => setPowerList(false)}>
        <img src="/pixelart/bg.jpg" alt="bg" />
        <div className="icon_container">
          <div className="icons_project">
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => folderOpen("all")}
            >
              <img src="/pixelart/documents.png" alt="documents" />
              <p>ALL</p>
            </motion.div>
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => folderOpen("javascript")}
            >
              <img src="/pixelart/documents.png" alt="documents" />
              <p>JavaScript</p>
            </motion.div>
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => folderOpen("react")}
            >
              <img src="/pixelart/documents.png" alt="documents" />
              <p>React</p>
            </motion.div>
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => folderOpen("typescript")}
            >
              <img src="/pixelart/documents.png" alt="documents" />
              <p>TypeScript</p>
            </motion.div>
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => textFolderOpenEvent("aboutme")}
            >
              <img className="text" src="/pixelart/text.png" alt="text" />
              <p>ABOUT ME</p>
            </motion.div>
          </div>
          <div className="icons_contact">
            <motion.div
              className="icon"
              drag
              dragMomentum={false}
              onClick={() => textFolderOpenEvent("readme")}
            >
              <img className="text" src="/pixelart/text.png" alt="text" />
              <p>READ ME</p>
            </motion.div>
          </div>
        </div>
        <div className="btmBar">
          <div className="power">
            {powerList && (
              <ul className="powerlist">
                <li
                  onClick={() => {
                    textFolderOpenEvent("bomb");
                    setPowerList(false);
                  }}
                >
                  <img src="/pixelart/iconComputer.png" alt="iconComputer" />
                  <p>Bomb</p>
                </li>
                <li
                  onClick={() => {
                    folderOpen("all");
                    setPowerList(false);
                  }}
                >
                  <img src="/pixelart/documents.png" alt="documents" />
                  <p>ALL</p>
                </li>
                <li
                  onClick={() => {
                    folderOpen("javascript");
                    setPowerList(false);
                  }}
                >
                  <img src="/pixelart/documents.png" alt="documents" />
                  <p>JavaScript</p>
                </li>
                <li
                  onClick={() => {
                    folderOpen("react");
                    setPowerList(false);
                  }}
                >
                  <img src="/pixelart/documents.png" alt="documents" />
                  <p>React</p>
                </li>
                <li
                  onClick={() => {
                    folderOpen("typescript");
                    setPowerList(false);
                  }}
                >
                  <img src="/pixelart/documents.png" alt="documents" />
                  <p>TypeScript</p>
                </li>
              </ul>
            )}
            <div
              className="powerBtn"
              onClick={(e) => {
                e.stopPropagation();
                setPowerList((prev) => !prev);
              }}
            >
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
          <div className="time">
            <div className="timeBtn">
              <p>{now}</p>
            </div>
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
          {textFolderOpen !== "" && (
            <TextFolder
              text={textFolderOpen}
              setBtmState={setBtmState}
              zIndex={activeFolder === textFolderOpen ? 999 : 1}
              setActiveFolder={() => setActive(textFolderOpen)}
              setTextFolderOpen={setTextFolderOpen}
              setActive={setActive}
            />
          )}
        </AnimatePresence>
      </Container>
      {/* <Bomb /> */}
    </>
  );
};

export default ComputerDisplaySc4;
