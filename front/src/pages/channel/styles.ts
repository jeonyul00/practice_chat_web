import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
`;

export const Header = styled.header`
  padding: 24px 28px;
  border-bottom: 2px solid #e9ecef;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;

  & span {
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-right: 10px;
  }

  & button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const DragOver = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  backdrop-filter: blur(5px);
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: #667eea;
`;

export const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: transparent;
`;

export const ChatList = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ChatItem = styled.div`
  display: flex;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(230, 230, 230, 0.5);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

export const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;

  strong {
    font-size: 15px;
    font-weight: 700;
    color: #2d3748;
  }

  span {
    font-size: 12px;
    color: #718096;
    font-weight: 500;
  }
`;

export const ChatText = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #4a5568;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const SectionHeader = styled.div`
  position: sticky;
  top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  z-index: 2;
`;

export const SectionDate = styled.div`
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  font-size: 13px;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  letter-spacing: 0.3px;
`;
