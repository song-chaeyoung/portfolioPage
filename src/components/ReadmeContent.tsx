import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 5rem;
  .readmeImg {
    width: 100%;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .readmeText {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    h2 {
      letter-spacing: -0.15rem;
    }
    p {
      letter-spacing: -0.05rem;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 2rem;
    .readmeImg {
      height: auto;
    }
  }
`;

const ReadmeContent = () => {
  return (
    <Container>
      <div className="readmeImg">
        <img src="/pixelart/readme.gif" alt="readme" />
      </div>
      <div className="readmeText">
        <h2>폴더 드래그 & 클릭 이벤트</h2>
        <p>
          폴더를 드래그하여 화면 내에서 자유롭게 이동할 수 있습니다. 또한,
          폴더를 클릭하면 폴더 내용을 확인할 수 있습니다.
        </p>
      </div>
    </Container>
  );
};

export default ReadmeContent;
