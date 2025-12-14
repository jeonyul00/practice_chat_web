import styled from "@emotion/styled";

export const Label = styled.label`
  margin-bottom: 16px;
  display: block;

  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #1d1c1d;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  padding: 12px;
  font-size: 15px;
  &:focus {
    outline: none;
    border-color: #007a5a;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007a5a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #148567;
  }
  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
  }
`;