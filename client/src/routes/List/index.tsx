import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

function List() {
  const location = useLocation();
  useEffect(() => {
    // console.log("location", location.search);
  }, []);
  const keywordFromQuery = useMemo(() => {
    const keyword = location.search.split("=")[1];
    return keyword;
  }, [location.search]);

  return (
    <>
      <h1>검색 결과: {keywordFromQuery}</h1>
    </>
  );
}

export default List;
