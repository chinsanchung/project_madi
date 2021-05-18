import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ListItem from "../../components/ListItem";

const ListUl = styled.ul`
  width: 100%;
  margin: 1px auto 0 auto;
  box-sizing: border-box;
  padding: 0;
  list-style: none;
`;

interface listItemProps {
  recipe_id: string;
  title: string;
  description: string;
  imgUrl: string;
}

function List() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const getInformationList = useCallback(async () => {
    try {
      const keyword = location.search.split("=")[1];
      const response = await axios.get(
        `/information/get-list/${keyword}/${page}`
      );
      // console.log("res?", response.data.rows);
      setData(response.data.rows);
      setLoading(false);
    } catch (error) {
      console.log("에러가 발생했습니다", error?.response?.data);
    }
  }, [location.search, page]);

  useEffect(() => {
    // console.log("location", location.search);
    getInformationList();
  }, [getInformationList]);

  const keywordFromQuery = useMemo(() => {
    const keyword = location.search.split("=")[1];
    console.log("키워드:", location.search);
    return keyword;
  }, [location.search]);

  if (loading) return <></>;

  return (
    <>
      <h1>검색 결과: {keywordFromQuery}</h1>
      {data.length > 0 && (
        <ListUl>
          {data.map((item: listItemProps) => (
            <ListItem
              key={item.recipe_id}
              recipe_id={item.recipe_id}
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          ))}
        </ListUl>
      )}
    </>
  );
}

export default List;
