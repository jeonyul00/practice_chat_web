import styled from "@emotion/styled";

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);

  & > div {
    margin-top: 200px;
    display: inline-block;
    width: 440px;
    background: white;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #616061;
  &:hover {
    color: #1d1c1d;
  }
`;