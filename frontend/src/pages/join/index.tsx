import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
const InputWithButton = styled.input`
  display: inline-block;
  width: 80%;
  font-size: 15px;
  box-sizing: border-box;
  padding-left: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: solid 1px #dadada;
`;
const InputSideButton = styled.a`
  width: 100px;
  height: 39px;
  box-sizing: border-box;
  padding: 10px 15px;
  margin-left: 10px;
  color: #fff;
  border: solid 1px rgba(0, 0, 0, 0.08);
  background-color: #03c75a;
  cursor: pointer;
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
interface IJoin {
  email: string;
  nickName: string;
  password: string;
  passwordConfirmation: string;
}
const initialValues: IJoin = {
  email: "",
  nickName: "",
  password: "",
  passwordConfirmation: "",
};

type IJoinStatus = {
  email: boolean;
  nickName: boolean;
};

function Join() {
  // 상태. 체크완료한건지 아닌지. 했으면 true 로 해서 중복검사 제외하기.
  const [joinStatus, setJoinStatus] = useState<IJoinStatus>({
    email: false,
    nickName: false,
  });
  const router = useRouter();
  const validationObj = useMemo(() => {
    return {
      email: Yup.string()
        .email("이메일 양식에 맞춰주세요")
        .required("필수 정보입니다."),
      nickName: Yup.string().required("필수 정보입니다."),
      password: Yup.string()
        // .min(7, "7글자 이상 입력해주세요")
        // .max(10, "10글자 이하로 입력해주세요")
        .required("필수 정보입니다."),
      passwordConfirmation: Yup.string()
        // .min(7, "7글자 이상 입력해주세요")
        // .max(10, "10글자 이하로 입력해주세요")
        .required("필수 정보입니다.")
        .oneOf([Yup.ref("password"), ""], "비밀번호가 서로 일치하지 않습니다."),
    };
  }, []);

  const checkDuplicate = useCallback(
    async ({
      type,
      value,
      setFieldError,
    }: {
      type: string;
      value: string;
      setFieldError: any;
    }) => {
      if (value !== "") {
        try {
          const response = await axios.post("/user/duplicate", {
            type,
            value,
          });
          console.log("checkDuplicate res", response.data);

          if (response.data.isDuplicate) {
            setFieldError(type, "중복입니다. 다른 정보를 기입해주세요.", true);
            setJoinStatus((prev) => ({ ...prev, [type]: false }));
            return;
          } else setJoinStatus((prev) => ({ ...prev, [type]: true }));
        } catch (error) {
          console.log("checkDuplicate error: ", error);
          return;
        }
      } else alert("값을 입력한 후 사용해주세요");
    },
    [joinStatus],
  );

  const postJoin = useCallback(
    async (values: IJoin) => {
      const bodyObject = {
        email: values.email,
        nickName: values.nickName,
        password: values.password,
      };
      console.log("status", joinStatus.email, joinStatus.nickName);
      if (joinStatus.email && joinStatus.nickName) {
        try {
          await axios.post("/user", bodyObject).then((res) => {
            Swal.fire({
              text: "회원가입이 완료되었습니다.",
              showCancelButton: false,
              confirmButtonText: "확인",
              confirmButtonColor: "#ade9ef",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/");
              }
            });
          });
        } catch (error) {
          console.log("postJoin error", error);
          Swal.fire({
            text: "회원가입에 에러가 발생했습니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            confirmButtonColor: "#ade9ef",
          });
        }
      } else alert("중복확인을 해주세요.");
    },
    [joinStatus],
  );

  return (
    <Container>
      <MainWrapper>
        <Title>회원가입</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationObj)}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={async (values, actions) => {
            await postJoin(values);
          }}
        >
          {(props) => (
            <>
              <FormWrapper>
                <Form style={{ width: "100%" }}>
                  <div className="row_group">
                    <h3>이메일</h3>
                    <div
                      className="input-btn-area"
                      style={{ position: "relative" }}
                    >
                      <Field name="email" as={InputWithButton} />
                      <InputSideButton
                        onClick={() =>
                          checkDuplicate({
                            type: "email",
                            value: props.values.email,
                            setFieldError: props.setFieldError,
                          })
                        }
                      >
                        중복확인
                      </InputSideButton>
                    </div>
                    {joinStatus.email && (
                      <div style={{ marginTop: "0.25rem", color: "green" }}>
                        <span>사용 가능한 계정입니다.</span>
                      </div>
                    )}
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <ErrorDiv>
                          <span>{msg}</span>
                        </ErrorDiv>
                      )}
                    />
                  </div>
                  <div className="row_group">
                    <h3>닉네임</h3>
                    <div
                      className="input-btn-area"
                      style={{ position: "relative" }}
                    >
                      <Field name="nickName" as={InputWithButton} />
                      <InputSideButton
                        onClick={() =>
                          checkDuplicate({
                            type: "nickName",
                            value: props.values.nickName,
                            setFieldError: props.setFieldError,
                          })
                        }
                      >
                        중복확인
                      </InputSideButton>
                    </div>
                    {joinStatus.nickName && (
                      <div style={{ marginTop: "0.25rem", color: "green" }}>
                        <span>사용 가능한 닉네임입니다.</span>
                      </div>
                    )}
                    <ErrorMessage
                      name="nickName"
                      render={(msg) => (
                        <ErrorDiv>
                          <span>{msg}</span>
                        </ErrorDiv>
                      )}
                    />
                  </div>
                  <div className="row_group">
                    <h3>비밀번호</h3>
                    <div
                      className="input-btn-area"
                      style={{ position: "relative" }}
                    >
                      <Field type="password" name="password" as={Input} />
                    </div>
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <ErrorDiv>
                          <span>{msg}</span>
                        </ErrorDiv>
                      )}
                    />
                  </div>
                  <div className="row_group">
                    <h3>비밀번호 재확인</h3>
                    <div
                      className="input-btn-area"
                      style={{ position: "relative" }}
                    >
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        as={Input}
                      />
                    </div>
                    <ErrorMessage
                      name="passwordConfirmation"
                      render={(msg) => (
                        <ErrorDiv>
                          <span>{msg}</span>
                        </ErrorDiv>
                      )}
                    />
                  </div>
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
