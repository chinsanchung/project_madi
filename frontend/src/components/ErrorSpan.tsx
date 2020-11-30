import React from "react";
import styled from "styled-components";

const Span = styled.span`
  background-color: #fff;
  padding: 0.56em 0.75em;
  font-size: 1em;
  border-radius: 1rem;
  margin-top: 20px;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    /* offset should move with padding of parent */
    left: 1.5em;
    border: 0.75rem solid transparent;
    border-top: none;
    /* looks */
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
`;

function ErrorSpan({ msg }: { msg: string }) {
  return <Span>{msg}</Span>;
}

export default ErrorSpan;
