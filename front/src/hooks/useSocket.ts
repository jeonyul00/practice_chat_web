import { useCallback } from "react";
import SockJS from "sockjs-client";

const backUrl =
  import.meta.env.MODE === "production"
    ? "https://sleact.nodebird.com"
    : "http://localhost:3095";

interface SocketClient {
  socket: WebSocket;
  send: (type: string, payload: any) => void;
  on: (destination: string, callback: (data: any) => void) => void;
  off: (destination: string) => void;
  disconnect: () => void;
}

// workspace마다 소켓 하나씩 저장해두는 곳
// { "sleact": 소켓, "another": 소켓2 } 이런 식
const sockets: { [key: string]: SocketClient } = {};

// ==========================================
// 🔧 소켓 생성 함수
// ==========================================
const createSocketClient = (workspace: string): SocketClient => {
  // 1️⃣ 서버랑 WebSocket 연결 만들기
  const sock = new SockJS(`${backUrl}/ws`);

  // 2️⃣ 구독 목록 저장소
  // "/sub/channel/general" -> 콜백함수 이런 식으로 저장
  const listeners = new Map<string, (data: any) => void>();

  // 3️⃣ 연결 성공하면 실행
  sock.onopen = () => {
    console.log("✅ 연결 성공!");
    // 서버한테 "나 이 workspace에 들어갈게!" 알림
    try {
      const connectMsg = JSON.stringify({
        type: "CONNECT",
        payload: { workspace },
      });
      console.log("📤 CONNECT 메시지 전송:", connectMsg);
      sock.send(connectMsg);
    } catch (error) {
      console.error("CONNECT 메시지 전송 실패:", error);
    }
  };

  // 4️⃣ 서버가 메시지 보내면 실행
  sock.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      const { type, destination, body, payload } = message;

      // 메시지 타입이면
      if (type === "MESSAGE" && destination) {
        // 내가 구독한 destination인지 확인
        const listener = listeners.get(destination);
        if (listener) {
          // body를 파싱해서 콜백 실행
          let data = body;
          if (typeof body === "string") {
            try {
              data = JSON.parse(body);
            } catch (e) {
              // JSON이 아니면 그냥 문자열로 사용
              data = body;
            }
          }
          listener(data); // 여기서 화면 업데이트!
        }
      } else if (type === "CONNECTED") {
        console.log("✅ 서버가 연결 확인함:", payload);
      }
    } catch (error) {
      console.error("❌ 메시지 파싱 실패:", error);
    }
  };

  sock.onerror = (error) => {
    console.error("❌ 소켓 에러:", error);
    console.error("연결 URL:", `${backUrl}/ws`);
    console.error("Workspace:", workspace);
  };

  sock.onclose = (event) => {
    console.log("🔌 연결 끊김");
    console.log("Close event:", {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean,
    });
  };

  // 5️⃣ 반환할 객체
  return {
    socket: sock as any,

    // 서버한테 뭔가 보낼 때 사용
    send: (type: string, payload: any) => {
      if (sock.readyState === SockJS.OPEN) {
        sock.send(JSON.stringify({ type, payload }));
      } else {
        console.warn("⚠️ 소켓이 닫혀있어서 메시지를 보낼 수 없습니다:", {
          type,
          payload,
          readyState: sock.readyState,
        });
      }
    },

    // 구독하기: "이 채널 메시지 받을래!"
    // 예: socket.on("/sub/channel/general", (data) => { setChats(...) })
    on: (destination: string, callback: (data: any) => void) => {
      // 1. 콜백 저장
      listeners.set(destination, callback);

      // 2. 서버한테 "나 이거 구독할래" 알림
      if (sock.readyState === SockJS.OPEN) {
        sock.send(
          JSON.stringify({ type: "SUBSCRIBE", payload: { destination } })
        );
      }
    },

    // 구독 취소
    off: (destination: string) => {
      listeners.delete(destination);
    },

    // 연결 끊기
    disconnect: () => {
      sock.close();
    },
  };
};

// ==========================================
// 🪝 커스텀 훅
// ==========================================
const useSocket = (
  workspace?: string
): [SocketClient | undefined, () => void] => {
  // 연결 끊는 함수
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  // workspace 없으면 아무것도 안 함
  if (!workspace) {
    return [undefined, disconnect];
  }

  // 이미 연결되어 있으면 재사용, 없으면 새로 만듦
  if (!sockets[workspace]) {
    sockets[workspace] = createSocketClient(workspace);
    console.info("🔌 소켓 생성:", workspace);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
