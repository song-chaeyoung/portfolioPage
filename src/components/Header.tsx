import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  .header_wrapper {
    /* width: 1200px;
    margin: 0 auto; */
    background: transparent;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px 10px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    .header_left {
      display: flex;
      align-items: center;
      gap: 6px;
      img {
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
      }
      p {
        font-family: "DungGeunMo";
        font-size: 20px;
        line-height: 1;
        letter-spacing: -2px;
        /* font: 400/1 20px "DungGeunMo"; */
      }
    }
    .header_right {
      display: flex;
      gap: 20px;
      li {
        font-family: "DungGeunMo";
        font-size: 18px;
        letter-spacing: -2px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div className="header_wrapper inner">
        <a href="#">
          <div className="header_left">
            <img src="/pixelart/pixelicon.png" alt="logo" />
            <p>프론트엔드 송채영</p>
          </div>
        </a>
        <ul className="header_right">
          <li>프로필</li>
          <li>기술</li>
          <li>프로젝트</li>
        </ul>
      </div>
    </HeaderContainer>
  );
};

export default Header;
