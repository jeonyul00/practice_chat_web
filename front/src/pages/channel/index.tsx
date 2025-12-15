import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/chat-box";
import { getChannelChats, postChannelChat } from "../../apis/channel";
import {
  Header,
  Container,
  ChatArea,
  ChatList,
  ChatItem,
  Avatar,
  ChatContent,
  ChatInfo,
  ChatText,
} from "./styles";

interface Chat {
  id: number;
  content: string;
  UserId: number;
  createdAt: string;
  User: {
    id: number;
    nickname: string;
  };
}

const Channel = () => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = useCallback(async () => {
    if (!workspace || !channel) return;

    try {
      const data = await getChannelChats(workspace, channel);
      setChats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("채널 채팅 조회 실패:", error);
      setChats([]);
    }
  }, [workspace, channel]);

  const onSubmitForm = useCallback(
    async (content: string) => {
      if (!workspace || !channel) return;

      try {
        await postChannelChat(workspace, channel, content);
        fetchChats();
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        alert("메시지 전송에 실패했습니다.");
      }
    },
    [workspace, channel, fetchChats]
  );

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>0</span>
          <button
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to channel"
            type="button"
          >
            <i
              className="c-icon p-ia__view_header__button_icon c-icon--add-user"
              aria-hidden="true"
            />
          </button>
        </div>
      </Header>
      <ChatArea>
        <ChatList>
          {chats.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              메시지가 없습니다. 첫 메시지를 보내보세요!
            </div>
          ) : (
            chats.map((chat) => (
              <ChatItem key={chat.id}>
                <Avatar>
                  {(chat.User?.nickname || "U").charAt(0).toUpperCase()}
                </Avatar>
                <ChatContent>
                  <ChatInfo>
                    <strong>{chat.User?.nickname || "Unknown"}</strong>
                    <span>
                      {new Date(chat.createdAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </ChatInfo>
                  <ChatText>{chat.content}</ChatText>
                </ChatContent>
              </ChatItem>
            ))
          )}
        </ChatList>
      </ChatArea>
      <ChatBox onSubmitForm={onSubmitForm} placeholder="메시지를 입력하세요" />
    </Container>
  );
};

export default Channel;
