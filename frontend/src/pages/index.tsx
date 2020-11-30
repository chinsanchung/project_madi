import React from "react";
import styled from "styled-components";
import Header from "@components/Header";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

function MainPage() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

export default MainPage;
