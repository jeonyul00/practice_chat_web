import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CollapseButton, SectionHeader, EmptyMessage } from "./styles";
import { getWorkspaceMembers } from "../../apis/workspace";

interface Member {
  id: number;
  nickname: string;
  email: string;
}

interface DMListProps {
  onlineUsers: number[];
}

const DMList = ({ onlineUsers }: DMListProps) => {
  const { workspace } = useParams<{ workspace: string }>();
  const navigate = useNavigate();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const toggleChannelCollapse = () => {
    setChannelCollapse((prev) => !prev);
  };

  const onClickMember = (id: number) => {
    navigate(`/workspace/${workspace}/dm/${id}`);
  };

  useEffect(() => {
    if (!workspace) return;

    const fetchMembers = async () => {
      try {
        const data = await getWorkspaceMembers(workspace);
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("멤버 목록 조회 실패:", error);
        setMembers([]);
      }
    };

    fetchMembers();
  }, [workspace]);

  return (
    <>
      <SectionHeader>
        <CollapseButton
          collapse={channelCollapse}
          onClick={toggleChannelCollapse}
        />
        <span>Direct Messages</span>
      </SectionHeader>
      <div>
        {!channelCollapse && (
          <>
            {members.length === 0 ? (
              <EmptyMessage>멤버가 없습니다.</EmptyMessage>
            ) : (
              members.map((member) => {
                const isOnline = onlineUsers.includes(member.id);
                return (
                  <div
                    key={member.id}
                    onClick={() => onClickMember(member.id)}
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        marginRight: "8px",
                        marginLeft: "28px",
                        color: isOnline ? "#2ecc71" : "#95a5a6",
                        fontSize: "12px",
                      }}
                    >
                      ●
                    </span>
                    <span>{member.nickname}</span>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DMList;
