import { useRef } from "react";
import { Skill, SkillItem } from "../type";
import styled from "styled-components";

const Container = styled.li<{ x: number; y: number }>`
  width: fit-content;
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  will-change: transform;
  &:nth-child(1),
  &:nth-child(4) {
    img {
      transform: scaleX(-1);
    }
  }
  &:nth-child(2),
  &:nth-child(5) {
    img {
      display: none;
    }
  }
  img {
    position: absolute;
    width: 5rem;
    height: 5rem;
    bottom: 98%;
    right: 0;
  }
  > ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    li {
      width: 32rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.6rem 1rem;
      border: 1px solid #fff;
      border-radius: 0.625rem;
      background: #000;
      border-top: none;
      &:nth-child(1) {
        background: transparent;
        font-size: 2.2rem;
        font-family: "DungGeunMo";
        padding: 1.25rem 1.88rem;
        color: var(--main-color);
        border: 3px solid var(--main-color);
        box-shadow: 0px 0px 10px 2px rgba(0, 111, 255, 0.5);
      }
      h3 {
        font-family: "DungGeunMo";
        font-size: 1.7rem;
        margin-bottom: 0.315rem;
      }
      p {
        font-size: 0.9rem;
        line-height: 1.2;
      }
    }
  }
`;

const ScrollItemSc3 = ({ data }: { data: Skill }) => {
  const { title, x, y, items } = data;

  const boxRef = useRef<HTMLLIElement>(null);
  return (
    <Container className="skillItem" ref={boxRef} x={x} y={y}>
      <img src="/pixelart/pixelicon_sit.png" alt="pixelicon" />
      <ul>
        <li className="title">{title}</li>
        {items.map((it: SkillItem, idx: number) => (
          <li key={idx}>
            <h3>{it.name}</h3>
            <p>{it.desc}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ScrollItemSc3;
