import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`
const SearchWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  margin: 0 auto;
  gap: 10px;
  grid-template-columns: repeat(4, 240px);
  grid-template-rows: repeat(8, 50px);
`
const SearchBar = styled.input`
  grid-row: 1 / 1;
  grid-column: 1 / -2;
  box-sizing: border-box;
  padding-left: 20px;
  font-family: NanumGothicBold;
  font-size: 20px;
`
const IngredientSpecies = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / 1;
  background-color:red;
  overflow-y: scroll;
`
const IngredientList = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / -2;
  background-color: green;
  overflow-y: scroll;
`

const SelectedIngredients = styled.div`
  grid-row: 1 / -1;
  grid-column:  span 1;
  background-color:yellow;
`

function IngredientSearch() {
  return (
    <Container>
      <SearchWrapper>
        <SearchBar type='search' placeholder='재료명을 입력하시거나, 하단의 재료 아이콘을 클릭해주세요' />
        <IngredientSpecies></IngredientSpecies>
        <IngredientList></IngredientList>
        <SelectedIngredients></SelectedIngredients>
      </SearchWrapper>
    </Container>
  )
}


export default IngredientSearch;