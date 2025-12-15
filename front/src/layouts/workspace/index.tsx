import {
  AddButton,
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
  WorkspaceModal,
} from "./styles";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import Channel from "../../pages/channel";
import DirectMessage from "../../pages/direct-message";
import Menu from "../../components/menu";
import Modal from "../../components/modal";
import CreateChannelModal from "../../components/create-channel-modal";
import InviteWorkspaceModal from "../../components/invite-workspace-modal";
import ChannelList from "../../components/channel-list";
import DMList from "../../components/dm-list";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../../store";
import {
  getWorkspaceList,
  createWorkspace,
  getWorkspaceMembers,
} from "../../apis/workspace";

interface WorkspaceType {
  id: number;
  name: string;
  url: string;
}

interface MemberType {
  id: number;
  nickname: string;
  email: string;
}

const Workspace = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { workspace } = useParams<{ workspace: string }>();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [workspaceList, setWorkspaceList] = useState<WorkspaceType[]>([]);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] =
    useState(false);

  const [members, setMembers] = useState<MemberType[]>([]);

  const onClickUserProfile = () => {
    setShowUserMenu((prev) => !prev);
  };

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onLogOut = useCallback(() => {
    clearAuth();
    navigate("/login");
  }, [clearAuth, navigate]);

  const onClickWorkspace = useCallback(
    (workspaceUrl: string) => {
      navigate(`/workspace/${workspaceUrl}/channel/general`);
    },
    [navigate]
  );

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setNewWorkspace("");
    setNewUrl("");
  }, []);

  const onChangeNewWorkspace = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewWorkspace(e.target.value);
    },
    []
  );

  const onChangeNewUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUrl(e.target.value);
    },
    []
  );

  const onCreateWorkspace = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      try {
        await createWorkspace({ workspace: newWorkspace, url: newUrl });
        setNewWorkspace("");
        setNewUrl("");
        setShowCreateWorkspaceModal(false);
        await handleGetWorkspaceList();
        navigate(`/workspace/${newUrl}/channel/general`);
      } catch (error) {
        console.error("워크스페이스 생성 실패:", error);
        alert("워크스페이스 생성에 실패했습니다.");
      }
    },
    [newWorkspace, newUrl, navigate]
  );

  const handleGetWorkspaceList = async () => {
    try {
      const data = await getWorkspaceList();
      console.log("워크스페이스 목록:", data);
      setWorkspaceList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("워크스페이스 목록 조회 실패:", error);
      setWorkspaceList([]);
    }
  };

  const handleGetMembers = async () => {
    if (!workspace) return;

    try {
      const data = await getWorkspaceMembers(workspace);
      setMembers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("멤버 목록 조회 실패:", e);
      setMembers([]);
    }
  };

  useEffect(() => {
    handleGetWorkspaceList();
  }, []);

  useEffect(() => {
    if (workspace) {
      handleGetMembers();
    }
  }, [workspace]);

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src="https://gravatar.com/avatar/placeholder?s=28&d=retro"
              alt="profile"
            />
            {showUserMenu && (
              <Menu
                style={{ right: 0, top: 38 }}
                show={showUserMenu}
                onCloseModal={onClickUserProfile}
              >
                <ProfileModal>
                  <img
                    src="https://gravatar.com/avatar/placeholder?s=28&d=retro"
                    alt="profile"
                  />
                  <div>
                    <span id="profile-name">{user?.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {workspaceList.map((workspace) => (
            <WorkspaceButton
              key={workspace.id}
              onClick={() => onClickWorkspace(workspace.url)}
            >
              {workspace.name.slice(0, 1).toUpperCase()}
            </WorkspaceButton>
          ))}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            {workspaceList?.find((v) => v.url === workspace)?.name}
          </WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}
            >
              <WorkspaceModal>
                <h2>{workspaceList?.find((v) => v.url === workspace)?.name}</h2>
                <button onClick={onClickInviteWorkspace}>
                  워크스페이스에 사용자 초대
                </button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogOut}>로그아웃</button>

                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      color: "#1d1c1d",
                    }}
                  >
                    멤버 ({members.length})
                  </h3>
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {members.length === 0 ? (
                      <div
                        style={{
                          padding: "12px",
                          color: "#616061",
                          fontSize: "13px",
                          textAlign: "center",
                        }}
                      >
                        멤버가 없습니다
                      </div>
                    ) : (
                      members.map((member) => (
                        <div
                          key={member.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8f8f8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "4px",
                              backgroundColor: "#007a5a",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginRight: "12px",
                            }}
                          >
                            {member.nickname.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#1d1c1d",
                                marginBottom: "2px",
                              }}
                            >
                              {member.nickname}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#616061",
                              }}
                            >
                              {member.email}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
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
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="workspace"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              워크스페이스 이름
            </label>
            <input
              id="workspace"
              type="text"
              value={newWorkspace}
              onChange={onChangeNewWorkspace}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="workspace-url"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              워크스페이스 url
            </label>
            <input
              id="workspace-url"
              type="text"
              value={newUrl}
              onChange={onChangeNewUrl}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007a5a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            생성하기
          </button>
        </form>
      </Modal>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
    </div>
  );
};

export default Workspace;
