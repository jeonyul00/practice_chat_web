import styled from "@emotion/styled";

export const CreateMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;

  & > div {
    position: absolute;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 4px;
    user-select: none;
    min-width: 200px;
    z-index: 512;
    max-height: calc(100vh - 20px);
    color: #1d1c1d;
    padding: 8px 0;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 8px;
  top: 4px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #616061;
  &:hover {
    color: #1d1c1d;
  }
`;
