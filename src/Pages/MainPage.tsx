import React from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import TopSide from "../Components/Main/TopSide";
import MiddleSide from "../Components/Main/MiddleSide";


const Container = styled.div`
  position: relative;
  width: 100%;
`;
// <{ bgUrl: string }>
/* background: url(${(props): string => props.bgUrl});
  background-repeat: no-repeat;
  background-size: cover; */

function MainPage() {
  return (
    <>
      <Header />
      <Container>
        <TopSide />
        <MiddleSide />
      </Container>
    </>
  );
}

export default MainPage;