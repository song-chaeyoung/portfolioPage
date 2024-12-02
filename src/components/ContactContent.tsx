import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1rem 4rem;
  width: 75.125rem;
  height: 37.5rem;

  > div {
    /* flex: 1; */
  }
  .contact_img {
    background: #000;
    height: 80%;
    width: 10rem;
    min-width: 30%;
    border-radius: 1rem;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contact_info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .myInfo {
      h2 {
        font-family: "DungGeunMo";
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      h4 {
        font-family: "DungGeunMo";
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 1rem;
        line-height: 1.1;
        text-align: justify;
      }
    }
    .contactMe {
      h2 {
        font-family: "DungGeunMo";
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .contact_icons {
        display: flex;
        align-items: center;
        gap: 1rem;
        .contact_icon {
          transform: scale(0.85);
          transition: all 0.3s;
          &:hover {
            transform: scale(0.85) translateY(-6px);
          }
          &:nth-child(2) {
            transform: scale(1.05);
            &:hover {
              transform: scale(1.05) translateY(-10px);
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 3rem 1rem;

    .contact_img {
      height: 50%;
      width: auto;
    }
  }
`;

const ContactContent = () => {
  return (
    <Container>
      <div className="contact_img">
        <img src="/pixelart/aboutMe.jpg" alt="aboutMe" />
      </div>
      <div className="contact_info">
        {/* <h2>안녕하세요 프론트엔드 송채영입니다</h2> */}
        <div className="myInfo">
          <h2>Education</h2>
          <h4>
            K-Digital Training 기업연계 프론트엔드 개발
            <small>(24.06~ 24.12)</small>
          </h4>
          <p>
            Figma를 활용해 웹사이트와 앱의 화면 디자인을 제작하고, React와
            Node.js로 화면을 설계 및 구현하였습니다. 또한, 생성형 AI인 ChatGPT를
            활용하여 원하는 기능에 맞는 코드를 생성함으로써 개발 과정을 더욱
            빠르고 효율적으로 진행할 수 있었습니다. 이러한 과정을 통해
            프론트엔드 개발에 필요한 전반적인 기술을 습득하며, 실무 기반의
            부트캠프 교육과정을 성공적으로 수료하였습니다.
          </p>
        </div>
        <div className="myInfo">
          <h2>Career</h2>
          <h4>
            건축사사무소 에스파스 <small>(22.01~ 24.04)</small>
          </h4>
          <p>
            건축사사무소에서 근무하며 주요 현상 공모 프로젝트에 참여하여 건축
            설계 및 도면 작성, 설계 설명서 작성 등의 업무를 수행했습니다. 이를
            통해 꼼꼼한 계획 수립과 창의적 아이디어를 도출하는 능력을 키웠으며,
            제한된 시간 안에 결과물을 도출하는 프로젝트 관리 능력도 배양할 수
            있었습니다.
          </p>
        </div>
        <div className="contactMe">
          <h2>Contact Me</h2>
          <div className="contact_icons">
            <div className="contact_icon">
              <a href="https://github.com/song-chaeyoung" target="_blank">
                <i className="nes-icon github is-medium"></i>
              </a>
            </div>
            <div className="contact_icon">
              <a href="mailto:call0512@naver.com" target="_blank">
                <i className="nes-icon gmail is-medium"></i>
              </a>
            </div>
            <div className="contact_icon">
              <a href="https://velog.io/@scy512" target="_blank">
                <i className="velog">
                  <img src="/pixelart/velog_logo.png" alt="velog" />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactContent;
