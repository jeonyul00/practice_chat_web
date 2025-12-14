import {
  AddButton,
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./styles";
import { Routes, Route, Navigate } from "react-router-dom";
import Channel from "../../pages/channel";
import DirectMessage from "../../pages/direct-message";

const Workspace = () => {
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg
              src="https://gravatar.com/avatar/placeholder?s=28&d=retro"
              alt="profile"
            />
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          <WorkspaceButton>Y</WorkspaceButton>
          <AddButton>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName>전율의 워크스페이스</WorkspaceName>
          <MenuScroll></MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="channel/:channel" element={<Channel />} />
            <Route path="dm/:id" element={<DirectMessage />} />
            <Route
              path="*"
              element={<Navigate to="channel/general" replace />}
            />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
