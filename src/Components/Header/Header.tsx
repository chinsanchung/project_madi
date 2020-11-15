import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #ff6400;
`;
const HeaderWrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const LeftSide = styled.div``;
const Logo = styled.span`
  font-family: VeganStyle;
  font-size: 30px;
  color: #fff;
`;
const RightSide = styled.div``;

function Header() {
  return (
    <Container>
      <HeaderWrapper className="header-wrapper">
        <LeftSide className="header-left">
          <Logo className="logo-span">madi</Logo>
        </LeftSide>
        <RightSide className="header-right"></RightSide>
      </HeaderWrapper>
    </Container>
  );
}

export default Header;
