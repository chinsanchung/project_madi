import React from "react";
import styled from "styled-components";
import { ingredientSpecies } from "../../util/ingredientConstants";

const Container = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / 1;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid;
`;
const SpeciesItem = styled.li`
  display: block;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid #dddddd;
`;
const Button = styled.button`
  text-align: left;
  width: 100%;
  font-size: 17px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;
function SpeciesList() {
  return (
    <Container>
      <ul style={{ paddingLeft: 0, marginTop: 0 }}>
        {ingredientSpecies.map((item, index) => (
          <SpeciesItem key={index}>
            <Button onClick={() => alert(item)}>{item}</Button>
          </SpeciesItem>
        ))}
      </ul>
    </Container>
  );
}

export default SpeciesList;
