import React, { useCallback } from "react";
import axios from "axios";
import cookie from "react-cookies";
import styled from "styled-components";
import { useRouter } from "next/router";
import MainLayout from "@src/components/layout/MainLayout";
import { useContextState } from "@src/store";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

function MainPage() {
  const router = useRouter();
  const state = useContextState();

  const testBtn = useCallback(async () => {
    const token = cookie.load("rNADACI4MAoJb5C");
    if (token) {
      try {
        const response = await axios.get("/auth/valid", {
          withCredentials: true,
        });
        console.log("resp", response.data);
      } catch (error) {
        // error.response 로 전체 확인
        console.log("auth error", error?.response);
      }
    } else alert("로그인 안한 상황");
  }, []);
  const goToPostPage = useCallback(() => {
    router.push("/posts");
  }, []);

  return (
    <MainLayout>
      <h1>메인 화면</h1>
      <button onClick={testBtn}>토큰 일치여부 확인</button>
      <button onClick={() => console.log("state?", state)}>context</button>
      <button onClick={goToPostPage}>글 목록</button>
    </MainLayout>
  );
}

export default MainPage;
