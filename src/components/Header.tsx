import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  .header_wrapper {
    background: transparent;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1.25rem 0.625rem 0.1875rem; */
    padding: 15px 10px 5px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    .header_left {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      cursor: pointer;
      img {
        width: 2.5rem;
        height: 2.5rem;
        margin-bottom: 6px;
      }
      p {
        font-family: "DungGeunMo";
        font-size: 1.25rem;
        line-height: 1;
        letter-spacing: -2px;
      }
    }
    .header_right {
      display: flex;
      gap: 1.25rem;
      li {
        font-family: "DungGeunMo";
        font-size: 1.125rem;
        letter-spacing: -2px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .header_wrapper {
      .header_left {
        p {
          font-size: 1.5rem;
        }
      }
      .header_right {
        padding-right: 0.5rem;
        li {
          font-size: 1.25rem;
        }
      }
    }
  }
`;

interface HeaderProps {
  onSection1: () => void;
  onSection2: () => void;
  onSection3: () => void;
  onSection4: () => void;
}

const Header = ({
  onSection1,
  onSection2,
  onSection3,
  onSection4,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <div className="header_wrapper inner">
        <div className="header_left" onClick={onSection1}>
          <img src="/pixelart/pixelicon.png" alt="logo" />
          <p>프론트엔드 송채영</p>
        </div>
        <ul className="header_right">
          <li onClick={onSection2}>프로필</li>
          <li onClick={onSection3}>기술</li>
          <li onClick={onSection4}>프로젝트</li>
        </ul>
      </div>
    </HeaderContainer>
  );
};

export default Header;
