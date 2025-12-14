import styled from "@emotion/styled";

export const Header = styled.header`
  height: 38px;
  background: #350d36;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`;

export const RightMenu = styled.div`
  float: right;
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 38px);
`;

export const Workspaces = styled.div`
  width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #3f0e40;
  border-top: 1px solid rgb(82, 38, 83);
  border-right: 1px solid rgb(82, 38, 83);
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;

export const Channels = styled.nav`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  color: rgb(188, 171, 188);
  vertical-align: top;
`;

export const WorkspaceName = styled.button`
  height: 64px;
  line-height: 64px;
  border: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 900;
  font-size: 24px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 16px;
  color: white;
  cursor: pointer;
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

export const WorkspaceButton = styled.button`
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: white;
  color: #3f0e40;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

export const AddButton = styled.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Chats = styled.div`
  flex: 1;
  background: white;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  gap: 12px;

  & img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & #profile-name {
      font-weight: bold;
      font-size: 15px;
      color: #1d1c1d;
    }

    & #profile-active {
      font-size: 13px;
      color: #616061;
    }
  }
`;

export const WorkspaceModal = styled.div`
  padding: 20px;
  min-width: 200px;

  & h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #1d1c1d;
  }

  & button {
    width: 100%;
    padding: 12px;
    margin-bottom: 8px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;

    &:hover {
      background: #f8f8f8;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
