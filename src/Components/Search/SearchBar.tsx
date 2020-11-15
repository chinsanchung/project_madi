import React from "react";
import styled from "styled-components";

const Container = styled.div<{ searchSize: string }>``;

interface SearchBarProps {
  searchSize: "string";
}

const SearchBar: React.FC<SearchBarProps> = ({ searchSize }) => {
  return <></>;
};

export default SearchBar;
