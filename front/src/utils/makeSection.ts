import dayjs from "dayjs";

interface Chat {
  id: number;
  content: string;
  createdAt: string;
  UserId?: number;
  SenderId?: number;
  ReceiverId?: number;
  User?: {
    id: number;
    nickname: string;
  };
  Sender?: {
    id: number;
    nickname: string;
    email: string;
  };
  Receiver?: {
    id: number;
    nickname: string;
    email: string;
  };
}

// ex) { "2025-01-15": [chat1, chat2], "2025-01-14": [chat3] }
export const makeSection = <T extends Chat>(chatList: T[]) => {
  const sections: Record<string, T[]> = {};

  // 최신순으로 정렬 (createdAt 기준 오름차순)
  const sortedChats = [...chatList].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  sortedChats.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format("YYYY-MM-DD");

    if (!sections[monthDate]) {
      sections[monthDate] = [];
    }
    sections[monthDate].push(chat);
  });

  return sections;
};
