import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
`;

export const ChatList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.1s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #007a5a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
`;

export const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;

  strong {
    font-size: 15px;
    font-weight: 900;
    color: #1d1c1d;
  }

  span {
    font-size: 12px;
    color: #616061;
  }
`;

export const ChatText = styled.div`
  font-size: 15px;
  line-height: 1.46668;
  color: #1d1c1d;
  white-space: pre-wrap;
  word-break: break-word;
`;