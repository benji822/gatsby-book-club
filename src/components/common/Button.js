import styled from "styled-components"

export const Button = styled.button`
  background: rebeccapurple;
  color: #fff;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 8px;
  text-decoration: none;
  outline: none;
  cursor: pointer;

  ${props => (props.block ? "display: block; width: 100%;" : "")}

  &:hover {
    background: indigo;
  }
`
