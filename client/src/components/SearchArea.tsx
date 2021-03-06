import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BarDiv = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;
const Input = styled.input`
  width: 100%;
  max-width: 300px;
  height: 50px;
  border-radius: 5x;
  box-sizing: border-box;
  padding: 0 5px;
  &:focus {
    outline: none;
  }
`;
const ListUl = styled.ul`
  width: 100%;
  max-width: 300px;
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid #e2e2e2;
  margin: 1px auto 0 auto;
  box-sizing: border-box;
  padding: 0;
  list-style: none;
`;
const SearchItem = styled.button`
  display: block;
  width: 100%;
  max-width: 300px;
  height: 48px;
  margin: 0 auto;
  text-align: left;
  box-sizing: border-box;
  padding: 0 5px;
  border: none;
  outline: 0;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`;

interface IKeyword {
  _id: string;
  name: string;
}

function SearchArea() {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  // const [keywordList, setKeywordList] = useState<String[]>([]);
  const [autoComplete, setAutoComplete] = useState<IKeyword[]>([]);

  const getDataFromKeyword = useCallback(async () => {
    try {
      // console.log("start autocomplete");
      const response = await axios.get(`/search?keyword=${keyword}`);
      // console.log("결과: ", response.data);
      const { result } = response.data;
      if (result) setAutoComplete(response.data.result);
    } catch (error) {
      console.log("에러 발생", error);
      return;
    }
  }, [keyword]);
  const onChangeKeyword = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      // await getDataFromKeyword();
    },
    []
  );
  useEffect(() => {
    if (keyword.length > 0) {
      getDataFromKeyword();
    }
  }, [getDataFromKeyword, keyword]);
  const onEnterEvent = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (keywordList.length < 6) {
    //   setKeywordList((prev) => [...prev, keyword]);
    //   setKeyword("");
    // }
  }, []);
  const onClickAutoComplete = useCallback(
    (val: IKeyword) => {
      history.push(`/list?keyword=${val?.name}`);
      // setAutoComplete([]);
      // setKeywordList((prev) => [...prev, val]);
      // setKeyword("");
    },
    [history]
  );
  // const onRemoveKeyword = useCallback((val: String) => {
  //   setKeywordList((prev) => prev.filter((item) => item !== val));
  // }, []);

  return (
    <BarDiv>
      <form onSubmit={onEnterEvent}>
        <Input
          value={keyword}
          placeholder="원하시는 검색어를 입력하세요."
          onChange={onChangeKeyword}
        />
      </form>
      <ListUl>
        {autoComplete.map((val, idx) => (
          <li key={"auto" + idx}>
            <SearchItem onClick={() => onClickAutoComplete(val)}>
              {val?.name}
            </SearchItem>
          </li>
        ))}
      </ListUl>
      {/* <ListUl>
        {keywordList.map((val, idx) => (
          <li key={idx}>
            <span>{val}</span>
            <button onClick={() => onRemoveKeyword(val)}>X</button>
          </li>
        ))}
      </ListUl> */}
    </BarDiv>
  );
}

export default SearchArea;
