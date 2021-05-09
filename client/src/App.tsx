import React from "react";
import styled from "styled-components";
import SearchArea from "./components/SearchArea";
import { minWidth, maxWidth } from "./config";

const Container = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: ${minWidth}) {
    max-width: ${minWidth};
  }
  @media screen and (max-width: ${maxWidth}) {
    max-width: ${maxWidth};
  }
`;

function App() {
  return (
    <Container className="App">
      <h3 style={{ textAlign: "center" }}>
        식재료를 입력해셔서 원하시는 레시피를 검색하세요.
      </h3>
      <h6 style={{ textAlign: "center" }}>
        최대 5개까지 키워드를 등록하실 수 있습니다.
      </h6>
      <SearchArea />
    </Container>
  );
}

export default App;
