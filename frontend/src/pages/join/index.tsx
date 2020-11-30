import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

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

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function Join() {
  const router = useRouter();
  const validationObj = useMemo(() => {
    return {
      email: Yup.string()
        .email("이메일 양식에 맞춰주세요")
        .required("Required"),
      password: Yup.string()
        .min(7, "7글자 이상 입력해주세요")
        .max(10, "10글자 이하로 입력해주세요")
        .required("Required"),
      passwordConfirmation: Yup.string()
        .min(7, "7글자 이상 입력해주세요")
        .max(10, "10글자 이하로 입력해주세요")
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "비밀번호가 서로 일치하지 않습니다."),
    };
  }, []);
  const initialValues: FormValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const postJoin = useCallback(async (values: FormValues) => {
    const bodyObject = { email: values.email, password: values.password };

    try {
      const response = await Axios.post(
        "http://localhost:5000/user",
        bodyObject,
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return (
    <Container>
      <MainWrapper>
        <Title>회원가입</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationObj)}
          onSubmit={async (values, actions) => {
            console.log("values: ", values, "actions", actions);
            // await postJoin(values);
          }}
        >
          {(props) => (
            <>
              <FormWrapper>
                <Form style={{ width: "100%" }}>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    type="text"
                    id="email"
                    value={props.values.email}
                    onChange={props.handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div
                        style={{
                          display: "block",
                          color: "red",
                          marginTop: "0.25rem",
                        }}
                      >
                        <span>{msg}</span>
                      </div>
                    )}
                  />
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    type="password"
                    id="password"
                    value={props.values.password}
                    onChange={props.handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div style={{ color: "red", marginTop: "0.25rem" }}>
                        <span>{msg}</span>
                      </div>
                    )}
                  />
                  <Label htmlFor="passwordConfirmation">비밀번호 재확인</Label>
                  <Input
                    type="password"
                    id="passwordConfirmation"
                    value={props.values.passwordConfirmation}
                    onChange={props.handleChange}
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    render={(msg) => (
                      <div style={{ color: "red", marginTop: "0.25rem" }}>
                        <span>{msg}</span>
                      </div>
                    )}
                  />
                </Form>
              </FormWrapper>
              <SubmitButton type="submit" onClick={() => props.handleSubmit()}>
                회원가입
              </SubmitButton>
            </>
          )}
        </Formik>
      </MainWrapper>
    </Container>
  );
}

export default Join;
