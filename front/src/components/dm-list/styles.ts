import styled from "@emotion/styled";

export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 0;
  margin-right: 8px;
  cursor: pointer;
  transition: transform 0.1s;

  &::before {
    content: "▸";
    font-size: 12px;
    transform: ${({ collapse }) =>
      collapse ? "rotate(0deg)" : "rotate(90deg)"};
    display: inline-block;
    transition: transform 0.1s;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  height: 28px;
  line-height: 28px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(188, 171, 188);
  padding: 0 16px;
  margin: 0;
  margin-top: 16px;
  user-select: none;

  & > span {
    flex: 1;
  }
`;

export const DMItem = styled.div<{ isActive: boolean }>`
  padding: 4px 16px 4px 36px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "white" : "rgb(188, 171, 188)")};
  background-color: ${({ isActive }) => (isActive ? "#1264a3" : "transparent")};
  font-size: 15px;
  height: 28px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin: 0 8px;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#1264a3" : "rgba(255, 255, 255, 0.1)"};
  }
`;

export const EmptyMessage = styled.div`
  padding: 4px 16px 4px 36px;
  color: rgb(188, 171, 188);
  font-size: 13px;
  opacity: 0.7;
`;
