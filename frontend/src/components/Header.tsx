import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { useContextDispatch, useContextState } from "@src/store";
import axios from "axios";

interface ILogout {
  readonly isLogin: boolean;
}

const Container = styled.div`
  max-width: 960px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const RightButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonIfNotLogined = styled.button<ILogout>`
  box-sizing: border-box;
  font-size: 17px;
  padding: 10px 20px;
  ${(props) =>
    props.isLogin === true &&
    css`
      display: none;
    `}
`;
const ButtonIfLogined = styled.button<ILogout>`
  box-sizing: border-box;
  font-size: 17px;
  padding: 10px 20px;
  ${(props) =>
    props.isLogin === false &&
    css`
      display: none;
    `}
`;

function Header() {
  const state = useContextState();
  const dispatch = useContextDispatch();
  const router = useRouter();

  const goToLoginPage = useCallback(() => {
    router.push("/login");
  }, []);
  const goToJoinPage = useCallback(() => {
    router.push("/join");
  }, []);
  const onLogOut = useCallback(async () => {
    try {
      await axios.delete("/auth/token", {
        withCredentials: true,
      });
      dispatch({ type: "LOGOUT" });
    } catch (error) {}
  }, []);

  return (
    <Container>
      <RightButtonWrapper>
        <ButtonIfNotLogined isLogin={state.isLogin} onClick={goToLoginPage}>
          로그인
        </ButtonIfNotLogined>
        <ButtonIfNotLogined isLogin={state.isLogin} onClick={goToJoinPage}>
          회원가입
        </ButtonIfNotLogined>
        <ButtonIfLogined onClick={onLogOut} isLogin={state.isLogin}>
          로그아웃
        </ButtonIfLogined>
      </RightButtonWrapper>
    </Container>
  );
}

export default Header;
