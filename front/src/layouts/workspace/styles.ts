import styled from "@emotion/styled";

export const Header = styled.header`
  display: none;
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
  background: white;

  &:hover {
    border-color: #667eea;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const Workspaces = styled.div`
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 20px 0;
  gap: 12px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
`;

export const Channels = styled.nav`
  width: 260px;
  display: flex;
  flex-direction: column;
  background: #fafbfc;
  border-right: 1px solid #e2e8f0;
`;

export const ChannelHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WorkspaceName = styled.button`
  border: none;
  background: transparent;
  font-weight: 700;
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #1a202c;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;

  &:hover {
    color: #667eea;
  }

  &::before {
    content: '⚡';
    font-size: 18px;
  }
`;

export const MenuScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 2px;

    &:hover {
      background: #a0aec0;
    }
  }
`;

export const WorkspaceButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 20px;
    background: #667eea;
    border-radius: 0 2px 2px 0;
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 4px;
  }
`;

export const AddButton = styled.button`
  color: #718096;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 2px dashed #cbd5e0;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    border-color: #667eea;
    color: #667eea;
    transform: scale(1.05);
  }
`;

export const Chats = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;

  & img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 6px;

    & #profile-name {
      font-weight: 700;
      font-size: 16px;
      color: #2d3748;
    }

    & #profile-active {
      font-size: 13px;
      color: #718096;
      font-weight: 500;
    }
  }
`;

export const WorkspaceModal = styled.div`
  padding: 24px;
  min-width: 240px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
  border-radius: 12px;

  & h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  & button {
    width: 100%;
    padding: 14px 16px;
    margin-bottom: 10px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
      border-color: #667eea;
      transform: translateX(4px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
