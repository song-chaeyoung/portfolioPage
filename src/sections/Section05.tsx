import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #212429; */
  background: #2b2a3a;

  .ballon {
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  }
  .btmGround {
    position: absolute;
    top: calc(100% - 13vh);
    width: 100%;
    height: 100%;
    .lightGreen {
      width: 100%;
      height: 2vh;
      background-color: #90c35c;
    }
    .green {
      width: 100%;
      height: 4vh;
      background: #50b146;
    }
    .brown {
      width: 100%;
      height: 7vh;
      background: #673832;
    }
  }
`;

const Section05 = () => {
  return (
    <Container>
      <div className="nes-balloon from-left is-dark ballon">
        <div className="contact_text">
          <h3>감사합니다</h3>
          <p>
            프론트엔드 개발자로 성장하기 위해 낯선 기술에도 적극적으로 도전하고,
            항상 사용자의 관점에서 생각하며 사용하기 좋은 서비스를 만들고
            싶습니다.
          </p>
          <p>사소한 의견도 감사히 받겠습니다.</p>
        </div>
        <div className="contact_icons">
          <div className="contact_icon">
            <i className="nes-icon github is-medium"></i>
          </div>
          <div className="contact_icon">
            <i className="nes-icon gmail is-medium"></i>
          </div>
          <div className="contact_icon">
            <i className="nes-icon gmail is-medium"></i>
          </div>
        </div>
      </div>
      <div className="btmGround">
        <div className="lightGreen"></div>
        <div className="green"></div>
        <div className="brown"></div>
      </div>
    </Container>
  );
};

export default Section05;
