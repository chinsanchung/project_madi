import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useContextDispatch } from "@src/store";

const Container = styled.div`
  position: relative;
`;
const MainWrapper = styled.div`
  max-width: 540px;
  width: 100%;
  margin: 100px auto 0 auto;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 33px;
  padding-bottom: 23px;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: bold;
  font-stretch: normal;
  font-size: 25px;
`;
const Label = styled.label`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  display: inline-block;
`;
const Input = styled.input`
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const SubmitButton = styled.button`
  background-color: #e49582;
  align-self: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 23px;
  height: 50px;
  padding: 15px 0;
  border-radius: 2px;
  border: none;
`;
const ErrorDiv = styled.div`
  color: red;
  margin-top: 0.25rem;
`;

interface loginProps {
  email: string;
  password: string;
}
const initialValue: loginProps = { email: "", password: "" };

function Login() {
  const router = useRouter();
  const dispatch = useContextDispatch();

  const validationObj = useMemo(() => {
    return {
      email: Yup.string().required("이메일을 입력해주세요"),
      password: Yup.string().required("비밀번호를 입력해주세요"),
    };
  }, []);

  const postLogin = useCallback(async (values: loginProps) => {
    try {
      const response = await axios.post("/auth/login", values, {
        withCredentials: true,
      });
      console.log("response", response.data);

      axios.defaults.headers.common["Authorization"] = response.data;
      dispatch({ type: "LOGIN" });

      router.push("/");
    } catch (error) {
      console.log("login error", error);
    }
  }, []);

  return (
    <Container>
      <MainWrapper>
        <Title>로그인</Title>
        <Formik
          initialValues={initialValue}
          validationSchema={Yup.object(validationObj)}
          onSubmit={async (values, actions) => {
            await postLogin(values);
          }}
        >
          {(props) => (
            <>
              <FormWrapper>
                <Form style={{ width: "100%" }}>
                  <Label htmlFor="email">이메일</Label>
                  <Field type="text" name="email" as={Input} />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <ErrorDiv>
                        <span>{msg}</span>
                      </ErrorDiv>
                    )}
                  />
                  <Label htmlFor="password">비밀번호</Label>
                  <Field type="text" name="password" as={Input} />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <ErrorDiv>
                        <span>{msg}</span>
                      </ErrorDiv>
                    )}
                  />
                </Form>
              </FormWrapper>
              <SubmitButton type="submit" onClick={() => props.handleSubmit()}>
                로그인
              </SubmitButton>
            </>
          )}
        </Formik>
      </MainWrapper>
    </Container>
  );
}

export default Login;
