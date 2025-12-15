import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/chat-box";
import { getDMChats, postDMChat } from "../../apis/channel";
import {
  Container,
  Header,
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
  SenderId: number;
  ReceiverId: number;
  createdAt: string;
  Sender: {
    id: number;
    nickname: string;
    email: string;
  };
  Receiver: {
    id: number;
    nickname: string;
    email: string;
  };
}

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = useCallback(async () => {
    if (!workspace || !id) return;

    try {
      const data = await getDMChats(workspace, Number(id));
      setChats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("DM 채팅 조회 실패:", error);
      setChats([]);
    }
  }, [workspace, id]);

  const onSubmitForm = useCallback(
    async (content: string) => {
      if (!workspace || !id) return;

      try {
        await postDMChat(workspace, Number(id), content);
        fetchChats();
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        alert("메시지 전송에 실패했습니다.");
      }
    },
    [workspace, id, fetchChats]
  );

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <Container>
      <Header>
        <h2>Direct Message</h2>
      </Header>
      <ChatArea>
        <ChatList>
          {chats.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#666" }}
            >
              메시지가 없습니다. 첫 메시지를 보내보세요!
            </div>
          ) : (
            chats.map((chat) => (
              <ChatItem key={chat.id}>
                <Avatar>
                  {(chat.Sender?.nickname || "U").charAt(0).toUpperCase()}
                </Avatar>
                <ChatContent>
                  <ChatInfo>
                    <strong>{chat.Sender?.nickname || "Unknown"}</strong>
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

export default DirectMessage;
