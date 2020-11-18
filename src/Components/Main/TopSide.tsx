import React from "react";
import styled from "styled-components";
import topVideoMp4 from "./../../Styles/resources/mainTop.mp4";

const TopWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-content: center;
`;
const TopVideoWrapper = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 600px;
  background-color: black;
  background-position: center center;
  background-size: contain;
  object-fit: cover;
`;
const TitleWrapper = styled.div`
  z-index: 3;
  align-self: center;
`;
const LogoSpan = styled.span`
  font-family: VeganStyle;
  color: #fff;
  font-size: 50px;
`;
const Title = styled.span`
  font-family: NanumGothicBold;
  color: #fff;
  font-size: 50px;
`;
const SubTitle = styled.p`
  font-family: NanumGothicBold;
  color: #fff;
  font-size: 40px;
  text-align: center;
`;

function TopSide() {
  return (
    <TopWrapper>
      {/* text 영역 추가하기 */}
      <TitleWrapper>
        <LogoSpan>madi</LogoSpan>
        <Title> 와 함께 원하시는 레시피를 검색하세요</Title>
        <SubTitle>총 3,211개의 레시피가 등록되어있습니다.</SubTitle>
      </TitleWrapper>
      <TopVideoWrapper
        autoPlay={true}
        controls={false}
        loop={true}
        muted={true}
      >
        <source src={topVideoMp4} type="video/mp4" />
      </TopVideoWrapper>
    </TopWrapper>
  );
}

export default TopSide;
