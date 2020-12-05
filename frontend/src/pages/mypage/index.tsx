import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import styled from "styled-components";

interface IData {
  email: string;
  nickName: string;
}

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     console.log("access? ", axios.defaults.headers.common["Authorization"]);
//     const response = await axios.get("http://localhost:5000/api/user/my-info");
//     return { props: { data: response.data } };
//   } catch (error) {
//     // console.log("get myinfo", error?.response.data);
//     return { props: { data: { email: "", nickName: "" } } };
//   }
// };
// { data }: InferGetStaticPropsType<typeof getStaticProps>
function MyInfo() {
  const [data, setData] = useState<IData>({ email: "", nickName: "" });

  const getData = useCallback(async () => {
    try {
      console.log("access? ", axios.defaults.headers.common["Authorization"]);
      const response = await axios.get("/user/my-info");
      console.log("respose.data", response.data);

      setData(response.data);
    } catch (error) {
      console.log("get myinfo", error?.response.data);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>내 정보</h1>

      <div>
        <span>이메일: {data.email}</span>
        <span>닉네임: {data.nickName}</span>
      </div>
    </div>
  );
}

export default MyInfo;
