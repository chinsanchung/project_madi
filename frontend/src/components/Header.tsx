import React, { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  max-width: 960px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.div`
  font-family: VeganStyle;
  font-size: 30px;
  color: #fff;
`;
const RightButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightButton = styled.button`
  box-sizing: border-box;
  font-size: 17px;
  padding: 10px 20px;
`;

function Header() {
  const router = useRouter();
  const goToLoginPage = useCallback(() => {
    router.push("/login");
  }, []);
  const goToJoinPage = useCallback(() => {
    router.push("/join");
  }, []);

  return (
    <Container>
      <Logo>madi</Logo>
      <RightButtonWrapper>
        <RightButton onClick={goToLoginPage}>로그인</RightButton>
        <RightButton onClick={goToJoinPage}>회원가입</RightButton>
      </RightButtonWrapper>
    </Container>
  );
}

export default Header;
