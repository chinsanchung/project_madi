import React, { useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
const Input = styled.input`
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
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

function JoinForm() {
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
  return (
    <MainWrapper>
      <Title>회원가입</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape(validationObj)}
        onSubmit={async (values, actions) => {
          console.log("values: ", values, "actions", actions);
        }}
      >
        {(props) => (
          <>
            <FormWrapper>
              <Form onSubmit={props.handleSubmit}>
                <Input
                  type="text"
                  id="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  placeholder="이메일"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <div>
                      <span>{msg}</span>
                    </div>
                  )}
                />
                <Input
                  type="password"
                  id="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  placeholder="비밀번호"
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <span>{msg}</span>}
                />
                <Input
                  type="password"
                  id="passwordConfirmation"
                  value={props.values.passwordConfirmation}
                  onChange={props.handleChange}
                  placeholder="비밀번호 재확인"
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  render={(msg) => <span>{msg}</span>}
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
  );
}

export default JoinForm;
