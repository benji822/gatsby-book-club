import styled from "styled-components"

export const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  border-radius: 8px;
  box-shadow: none;

  &:focus,
  &:active {
    border: 1px solid rebeccapurple;
    outline: none;
  }
`
