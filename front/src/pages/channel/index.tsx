import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/chat-box";
import { getChannelChats, postChannelChat } from "../../apis/channel";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import dayjs from "dayjs";
import { makeSection } from "../../utils/makeSection";
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
  SectionHeader,
  SectionDate,
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const chatSections = makeSection(chats);

  const fetchChats = useCallback(
    async (pageNum: number = 1, isInitial: boolean = false) => {
      if (!workspace || !channel || isLoading) return;

      setIsLoading(true);
      try {
        const data = await getChannelChats(workspace, channel, 20, pageNum);
        const newChats = Array.isArray(data) ? data : [];

        if (isInitial) {
          setChats(newChats);
        } else {
          // 이전 메시지를 앞에 추가
          setChats((prev) => [...newChats, ...prev]);
        }

        // 더 이상 불러올 데이터가 없으면
        if (newChats.length < 20) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("채널 채팅 조회 실패:", error);
        if (isInitial) {
          setChats([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [workspace, channel, isLoading]
  );

  const onSubmitForm = useCallback(
    async (content: string) => {
      if (!workspace || !channel) return;

      try {
        await postChannelChat(workspace, channel, content);
        // 새 메시지 전송 후 첫 페이지만 다시 로드
        await fetchChats(1, true);
        setPage(1);
        setHasMore(true);
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        alert("메시지 전송에 실패했습니다.");
      }
    },
    [workspace, channel, fetchChats]
  );

  // 초기 로드
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchChats(1, true);
  }, [workspace, channel]);

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchChats(nextPage, false);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, page, fetchChats]);

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
        <SimpleBar style={{ height: "100%" }}>
          <ChatList>
            {/* 무한 스크롤 트리거 (맨 위) */}
            <div
              ref={observerTarget}
              style={{
                height: "20px",
                display: hasMore ? "block" : "none",
              }}
            />
            {isLoading && page > 1 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "16px",
                  color: "#667eea",
                  fontSize: "14px",
                }}
              >
                로딩 중...
              </div>
            )}
            {chats.length === 0 && !isLoading ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                메시지가 없습니다. 첫 메시지를 보내보세요!
              </div>
            ) : (
              Object.entries(chatSections).map(([date, chats]) => (
                <div key={date}>
                  <SectionHeader>
                    <SectionDate>
                      {dayjs(date).format("YYYY년 M월 D일")}
                    </SectionDate>
                  </SectionHeader>
                  {chats.map((chat) => (
                    <ChatItem key={chat.id}>
                      <Avatar>
                        {(chat.User?.nickname || "U").charAt(0).toUpperCase()}
                      </Avatar>
                      <ChatContent>
                        <ChatInfo>
                          <strong>{chat.User?.nickname || "Unknown"}</strong>
                          <span>{dayjs(chat.createdAt).format("A h:mm")}</span>
                        </ChatInfo>
                        <ChatText>{chat.content}</ChatText>
                      </ChatContent>
                    </ChatItem>
                  ))}
                </div>
              ))
            )}
          </ChatList>
        </SimpleBar>
      </ChatArea>
      <ChatBox onSubmitForm={onSubmitForm} placeholder="메시지를 입력하세요" />
    </Container>
  );
};

export default Channel;
