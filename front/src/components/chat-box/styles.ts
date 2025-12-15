import styled from "@emotion/styled";

export const ChatBoxContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #ddd;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

export const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #007a5a;
  }
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007a5a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  height: 40px;

  &:hover {
    background-color: #006644;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;