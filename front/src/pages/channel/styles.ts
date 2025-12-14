import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 38px);
  flex-flow: column;
  position: relative;
`;

export const Header = styled.header`
  height: 64px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #d1d1d1;
  font-weight: bold;
  font-size: 20px;

  & span {
    margin-right: 10px;
  }

  & button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 10px;
  }
`;

export const DragOver = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
