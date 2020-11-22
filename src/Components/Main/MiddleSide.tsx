import React from "react";
import styled from "styled-components";
import IngredientSearch from "../Search/IngredientSearch";

const MiddleWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const Title = styled.p`
  text-align: center;
  font-family: NanumGothicBold;
  font-size: 30px;
`;

function MiddleSide() {
  return (
    <MiddleWrapper>
      <Title>가지고 있는 재료를 이용해 레시피를 검색하실 수 있습니다.</Title>
      <IngredientSearch />
    </MiddleWrapper>
  );
}

export default MiddleSide;
