import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / -2;
  background-color: green;
  overflow-y: scroll;
`;

type GreetingsProps = {
  currentList: Array<string>;
};

const IngredientList = ({ currentList }: GreetingsProps) => {
  return <Container></Container>;
};

export default IngredientList;
